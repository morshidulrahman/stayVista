import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import { ImageUpload } from "../api/utils";
import toast from "react-hot-toast";

const UpdateProfileModal = ({ setIsOpen, isOpen }) => {
  const { updateUserProfile, user } = useAuth();

  const updatehandeler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const files = e.target.image.files[0];
    const image = await ImageUpload(files);
    console.log(image);

    try {
      await updateUserProfile(name, image);
      toast.success("Profile updated successfully");
      setIsOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full h-72 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Profile
                </DialogTitle>
                <div className="mt-4 w-full">
                  <form onSubmit={updatehandeler}>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">
                        Name
                      </label>
                      <input
                        defaultValue={user?.displayName}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name Here"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="image" className="block mb-2 text-sm">
                        Select Image:
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                      />
                    </div>
                    <div className="flex mt-6 justify-center gap-5">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateProfileModal.propTypes = {
  user: PropTypes.object,
  modalHandler: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UpdateProfileModal;
