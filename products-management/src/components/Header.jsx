import React, { useState } from 'react';
import { HomeOutlined, SmileOutlined, ShoppingOutlined, PhoneOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const items = [
    {
        label: (
            <Link to="/">HOME</Link>

        ),
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'COLLABORATION',
        key: 'collab-subMenu',
        icon: <SmileOutlined />,
        children: [
            {
                type: 'group',
                label: 'Artists',
                children: [
                    {
                        label: 'B RAY',
                        key: 'setting:1',
                    },
                    {
                        label: '16 TYPH',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Anime',
                children: [
                    {
                        label: 'One Piece',
                        key: 'setting:3',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <a href="https://dirtycoins.vn/lien-he" target="_blank" rel="noopener noreferrer">
                CONTACT
            </a>
        ),
        key: 'contact',
        icon: <PhoneOutlined />
    },
    {
        label: (

            <a href="/dashboard" className='link' target="_blank" rel="noopener noreferrer">
                DASHBOARD
            </a>

        ),
        key: 'dashboard',
    },
];
const NavBar = () => {
    const [current, setCurrent] = useState();
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <div className='header'>
                <a className="logo" href="/">
                    <img src="src\assets\logo.jpg" class="logo-img" alt="" />
                </a>

                <div className="menu">
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </div>


            </div>
        </>
    )
};
export default NavBar;