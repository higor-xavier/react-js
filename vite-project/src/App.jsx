import { Post } from './Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.css';
import './global.css';

export function App() {
    return (
        <div>
            <Header />

            <div className={styles.wrapper}>
                 <Sidebar />
                 <main>
                    <Post 
                        author='higor x' 
                        content='Lorem ipsum dolor sit, amet consectetur'
                    />
                    <Post 
                        author='laura x' 
                        content='Lorem ipsum dolor sit, amet consectetur'
                    />
                    <Post 
                        author='clara x' 
                        content='Post maneiro'
                    />
                 </main>
            </div>
            
        </div>
    )
}
