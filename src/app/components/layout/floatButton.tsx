import Link from "next/link";
import { floatButtonProps } from "@/types/floatButton.types";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";

export function FloatButton({ redeSocial, link }: floatButtonProps) {

    const iconStyles = {
        whatsapp: "bg-green-500",
        telegram: "bg-blue-500",
        instagram: "bg-pink-500",
    };

    const icons = {
        whatsapp: <FaWhatsapp size={50} />,
        telegram: <FaTelegram size={50} />,
        instagram: <FaInstagram size={50} />,
    };

    const icon = icons[redeSocial];
    const iconStyle = iconStyles[redeSocial];

    return (
        <Link href={link}>
            <button className={`fixed ${iconStyle} rounded-full p-3 text-white bottom-6 right-6 z-50`}>
                {icon}
            </button>
        </Link>
    );
}