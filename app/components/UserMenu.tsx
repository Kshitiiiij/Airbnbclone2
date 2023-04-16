"use client";
import { useCallback, useState } from "react";
import MenuItem from "./navbar/MenuItems";
import Avatar from "./Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "../types";
import RentModal from './modals/RentModal'
import useRentModal from "../hooks/useRentModal";
import {useRouter} from "next/navigation"
interface userMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const registarModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal()

  const onRent = useCallback(() =>{
    if(!currentUser){
      return loginModal.onOpen()
    }

      //open rent modal
      rentModal.onOpen()
    
  }, [currentUser, loginModal])

  const router = useRouter()

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => onRent()}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() =>router.push('/trips')} label="My trips" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => onRent()} label="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Log out"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registarModal.onOpen();
                  }}
                  label="SignUp"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
