import { Post } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.css';
import './global.css';

//author: {avatar_url: "", name: "", role: ""}
//publishedAt: Date
//content: String

const posts = [
    {
        id: 1,
        author: {
            avatarUrl: "https://github.com/higor-xavier.png",
            name: "Higor Xavier",
            role: "Full-Stack Developer"
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋'},
            { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare:'},
            { type: 'link', content: 'jane.design/doctorcare'},     
        ],
        publishedAt: new Date('2023-04-20 08:40:46')
    },

    {
        id: 2,
        author: {
            avatarUrl: "https://github.com/higor-xavier.png",
            name: "Higor Xavier",
            role: "Full-Stack Developer"
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋'},
            { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare:'},
            { type: 'link', content: 'jane.design/doctorcare'},     
        ],
        publishedAt: new Date('2023-08-24 05:45:46')
    }
];

export function App() {
    return (
        <div>
            <Header />

            <div className={styles.wrapper}>
                 <Sidebar />
                 <main>
                    {
                        posts.map( post => {
                            return (
                                <Post 
                                    author = { post.author }
                                    content = { post.content }
                                    publishedAt = { post.publishedAt }

                                />
                            )
                        })
                    }
                 </main>
            </div>
            
        </div>
    )
}
