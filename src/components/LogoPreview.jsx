import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import html2canvas from 'html2canvas';
import { icons } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';

const BASE_URL = "https://logoexpress.tubeguruji.com";

const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
        console.error(`Icon "${name}" not found in lucide-react icons.`);
        return null;
    }
    return (
        <LucidIcon 
            color={color} 
            size={size}
            style={{ transform: `rotate(${rotate}deg)` }}
        />
    );
};

function LogoPreview({ downloadIcon }) {
    const [storageValue, setStorageValue] = useState({});
    const { updateStorage } = useContext(UpdateStorageContext);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem("value"));
        setStorageValue(storageData);
    }, [updateStorage]);

    useEffect(() => {
        if (downloadIcon && isRendered) {
            downloadPngLogo();
        }
    }, [downloadIcon, isRendered]);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    /* To download the image */

    const downloadPngLogo = () => {
        const downloadLogoDiv = document.getElementById("downloadLogoDiv");

        if (downloadLogoDiv) {
            html2canvas(downloadLogoDiv, {
                backgroundColor: null
            }).then(canvas => {
                const pngImage = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngImage;
                downloadLink.download = 'Jisil_logo_express.png';
                downloadLink.click();
            });
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="h-[400px] w-[400px] bg-gray-200 outline-dotted outline-gray-300"
                style={{ padding: storageValue?.bgPadding }}
            >
                <div id="downloadLogoDiv" className="h-full w-full flex items-center justify-center"
                    style={{
                        borderRadius: storageValue?.bgRounded,
                        background: storageValue?.bgColor
                    }}
                >
                    {storageValue?.icon?.includes('.png')?
                    <img src={'/png/'+storageValue?.icon} alt="" 
                    style={{
                        height: storageValue?.iconSize,
                        width: storageValue?.iconSize,
                    }}/>:
                    <Icon 
                        name={storageValue?.icon}
                        color={storageValue?.iconColor}
                        size={storageValue?.iconSize}
                        rotate={storageValue?.iconRotate} 
                    />
                }
                </div>
            </div>
        </div>
    );
}

export default LogoPreview;
