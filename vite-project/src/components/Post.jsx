import styles from './Post.module.css';

export function Post(props){
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/higor-xavier.png" />
                    <div className={styles.authorInfo}>
                        <strong>{props.author}</strong>
                        <span>Tal tal tal</span>

                    </div>
                </div>

                <time title='20 de Abril às 04:20h' dateTime="2023-04-20 04:20:46">Publicado há 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>
                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare:</p>
                <p>👉{' '}<a href="#">jane.design/doctorcare</a></p>
                <p>
                    <a href="#">#novoprojeto</a>{' '}
                    <a href="">#nlw</a>{' '}
                    <a href="">#rocketseat🚀</a>{' '}
                </p>
            </div>

        </article>
    )
}