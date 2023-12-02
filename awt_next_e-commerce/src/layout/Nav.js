import Link from "next/link";
import React from "react";


export default function Nav({ children, styleProps, path,stylePropsForBtn }) {
//   console.log(children, styleProps);
    return (
        <>
        
            <Link href={path}>
                <button className={`${stylePropsForBtn}  text-orange group w-auto ml-3 h-7 leading-6 rounded-md pl-2 pr-2 bg-PureWhite hover:shadow hover:shadow-homeColor`}>
                    {children}
                    <span>
                        {" "}
                        <div
                            className={` w-0 h-0.5 absolute bottom-1 rounded-xl ${styleProps}  bg-PureWhite hover:invisible  group-hover:visible transition-all duration-1000 hover:duration-75 delay-0`}
                        ></div>
                    </span>
                </button>
            </Link>
        </>
    );
}