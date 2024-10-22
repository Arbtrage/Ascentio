
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { MailIcon, MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react'


const UserCard = (selectedUser: any) => {
    const user = selectedUser.user
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Button variant="outline">Archiver</Button>
            </div>

            <Image src={selectedUser.image} alt={user.name} width={200} height={200} />

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <Label>Téléphone</Label>
                    <div className="flex items-center mt-1">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input value={user.phone} readOnly />
                    </div>
                </div>
                <div>
                    <Label>E-mail</Label>
                    <div className="flex items-center mt-1">
                        <MailIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input value={user.email} readOnly />
                    </div>
                </div>
                <div>
                    <Label>Statut</Label>
                    <div className="flex items-center mt-1">
                        <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input value={user.status === 'active' ? 'Actif' : 'Inactif'} readOnly />
                    </div>
                </div>
                <div>
                    <Label>Adresse</Label>
                    <div className="flex items-center mt-1">
                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input value={user.address} readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
