import { Switch } from "@chakra-ui/react";
import Image from "next/image";

export default function Newsletter() {
    return (
        <div className="rounded my-1 shadow">
            <div className="rounded-t bg-slate-200 p-3">
                <b className="text-sm">NEWSLETTER</b>
            </div>
            <div className="flex p-5 items-center">
                <div>
                    <Image height={30} width={30} src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716026810/boc_media/subscription_s0q1uq.png" alt={"Newsletter"} />
                </div>
                <div className="mx-2">
                    <b>Subscribe to newsletter! </b>
                    <div className="text-xs">
                        You will be notified only for trending articles
                    </div>
                </div>
                <div className="ms-auto">
                    <Switch />
                </div>
            </div>
        </div>
    )
}