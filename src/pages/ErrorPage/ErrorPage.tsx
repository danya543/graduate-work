import styles from './errorPage.module.scss';
export const ErrorPage = () => {
  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.four_zero_four_bg}>
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Error"
          />
        </div>
        <div className={styles.content_box_404}>
          <h1>Error 404</h1>
          <div>
            <h3>Look like you&apos;re lost</h3>
            <p>the page you are looking for not avaible!</p>
            <a href="/">Home</a>
          </div>
        </div>
      </div>
    </section>
  );
};
