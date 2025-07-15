import {
    Phone,
    Facebook,
    Instagram,
    MessageCircle
} from "lucide-react"


interface ContactProps {
    ig?: string,
    line?: string,
    phone?: string,
    facebook?: string,
}

function Contact({ ig, line, phone, facebook }: ContactProps) {
    return (
        <div>
            <div className="ContactItem flex flex-col items-center justify-center gap-[1rem] ">
                {phone && (
                    <div className="ContactWrapper flex items-center justify-center gap-1 ">
                        <Phone className="size-4 text-textprimary " />
                        <p className="p3 text-textsecondary " >{phone}</p>
                    </div>
                )}

                {line && (
                    <div className="ContactWrapper flex items-center justify-center gap-1 ">
                        <MessageCircle className="size-4 text-textprimary " />
                        <p className="p3 text-textsecondary " >{line}</p>
                    </div>
                )}

                {facebook && (
                    <div className="ContactWrapper flex items-center justify-center gap-1 ">
                        <Facebook className="size-4 text-textprimary " />
                        <p className="p3 text-textsecondary " >{facebook}</p>
                    </div>
                )}

                {ig && (
                    <div className="ContactWrapper flex items-center justify-center gap-1 ">
                        <Instagram className="size-4 text-textprimary " />
                        <p className="p3 text-textsecondary " >{ig}</p>
                    </div>
                )}

            </div>
        </div>
    )
}
export default Contact