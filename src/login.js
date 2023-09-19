import React from 'react';
import './login_style.css';

function Header() {
    return(
        <Header>
            <H1>welcome</H1>
        </Header>
    )
}

function Nav(){
    return(
        <nav>
            <ol>
                <li>html</li>
                <li>css</li>
            </ol>
        </nav>
    )
}

function Article(){
    return (
        <article>
            <h2>Welcome</h2>
            Hello web!
        </article>
    )
}

export default function login(){
    return (
        <div>
            <Header></Header>
            <Nav></Nav>
        </div>
    )
}
