import React from 'react'

export const IconEngineer = ({ color = "currentColor" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 16V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 9H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="8" width="8" height="8" rx="1" stroke={color} strokeWidth="2" />
        <path d="M15 8V6C15 5.44772 14.5523 5 14 5H10C9.44772 5 9 5.44772 9 6V8" stroke={color} strokeWidth="2" />
        <path d="M15 16V18C15 18.5523 14.5523 19 14 19H10C9.44772 19 9 18.5523 9 18V16" stroke={color} strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
)

export const IconPartner = ({ color = "currentColor" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
        <path d="M12 2V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
        <path d="M14.1213 9.87868L18.364 5.63604" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="5" r="2" fill={color} fillOpacity="0.5" />
    </svg>
)
