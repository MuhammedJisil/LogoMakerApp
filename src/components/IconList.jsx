import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { icons } from 'lucide-react';
import { iconList } from '@/constants/icon';
import axios from 'axios';

const BASE_URL = "https://logoexpress.tubeguruji.com";

function IconList({ selectedIcon }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [pngIconList, setPngIconList] = useState([]);
    const [defaultTab, setDefaultTab] = useState("icons");
    const storageValue = JSON.parse(localStorage.getItem("value"));
    const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Camera");

    useEffect(() => {
        getPngIcon();
    }, []);

    const Icon = ({ name, color, size }) => {
        const LucidIcon = icons[name] || icons['Camera']; // Use 'Camera' as fallback
        if (!LucidIcon) {
            console.error(`Icon "${name}" not found in lucide-react icons.`);
            return null;
        }
        return <LucidIcon color={color} size={size} />;
    };

    const getPngIcon = () => {
        axios.get(BASE_URL + '/getIcons.php').then(resp => {
            console.log(resp);
            setPngIconList(resp.data);
        });
    };

    return (
        <div>
            <div>
                <label>Icon</label>
                <div
                    onClick={() => {
                        setOpenDialog(true);
                        setDefaultTab("icons");
                    }}
                    className='cursor-pointer p-3 bg-gray-200 rounded-md 
                my-2 w-[50px] h-[50px] flex items-baseline justify-center'>
                {icon?.includes('.png') ?
                    <img src={BASE_URL + "/png/" + icon} alt="" /> :
                    <Icon name={icon} color={"#000"} size={20} />
                }
                </div>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Pick Your Favourite Icon</DialogTitle>
                        <DialogDescription>
                            <Tabs defaultValue={defaultTab} className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="icons">Icons</TabsTrigger>
                                    <TabsTrigger value="color-icons">Color Icons</TabsTrigger>
                                </TabsList>
                                <TabsContent value="icons">
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4
                                        overflow-auto h-[400px] p-6'>
                                        {iconList.map((icon, index) => (
                                            <div key={index} className='border p-3 flex rounded-sm items-center
                                                justify-center cursor-pointer'
                                                onClick={() => {
                                                    selectedIcon(icon);
                                                    setOpenDialog(false);
                                                    setIcon(icon);
                                                }}
                                            >
                                                <Icon name={icon} color={"#000"} size={20} />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="color-icons">
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4
                                        overflow-auto h-[400px] p-6'>
                                        {pngIconList.map((icon, index) => (
                                            <div key={index} className='border p-3 flex rounded-sm items-center
                                                justify-center cursor-pointer'
                                                onClick={() => {
                                                    selectedIcon(icon);
                                                    setOpenDialog(false);
                                                    setIcon(icon);
                                                }}
                                            >
                                                <img src={BASE_URL + '/png/' + icon} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default IconList;

