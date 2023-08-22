import { PencilSimple } from 'phosphor-react';

import styles from './Sidebar.module.css';

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=50" 
                alt="" 
            />
            <div className={styles.profile}>
                <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/61365013?v=4" />
                <strong>Higor X.</strong>
                <span>Web Fullstack Dev</span>
            </div>
            <footer>
                <a href="#">
                    <PencilSimple size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    ); 
}