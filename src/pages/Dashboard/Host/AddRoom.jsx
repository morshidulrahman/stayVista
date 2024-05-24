import React, { useState } from "react";
import AddRoomForm from "../../../components/From/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { ImageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [ImageText, setImageText] = useState("Upload Image");
  const [loading, setloding] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (roominfo) => {
      const { data } = await axiosSecure.post("/rooms", roominfo);
      return data;
    },
    onSuccess: () => {
      setloding(false);
      toast.success("Room added successfully");
      navigate("/dashboard/my-listings");
    },
  });

  const handleDates = (item) => {
    setDates(item.selection);
  };

  const handleSubmit = async (e) => {
    setloding(true);
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];

    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    try {
      const image_url = await ImageUpload(image);
      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bathrooms,
        bedrooms,
        host,
        description,
        image: image_url,
      };
      await mutateAsync(roomData);
    } catch (e) {
      setloding(false);
      toast.error(e.message);
    }
  };

  const handleImage = (item) => {
    setImagePreview(URL.createObjectURL(item));
    setImageText(item.name);
  };

  return (
    <div>
      <AddRoomForm
        handleDates={handleDates}
        dates={dates}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        ImageText={ImageText}
        imagePreview={imagePreview}
        loading={loading}
      />
    </div>
  );
};

export default AddRoom;
