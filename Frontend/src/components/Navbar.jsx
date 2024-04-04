import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone1.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>¡Nuestro Whatsapp!</div>
          <div className="">+54 (341) 2527-455</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Inicio</li>
          </Link>
          <Link href="/#products" passHref>
          <li className={styles.listItem}>Productos</li>
          </Link>
          <Link href="/" passHref>
          <li className={styles.listItem}>
             <Image src="/img/mercadocarnesicon.png" alt="" width={160} height={50} />
          </li>
          </Link>
          <Link href="/NewsPage" passHref>
          <li className={styles.listItem}>Eventos</li>
          </Link>
          <Link href="/Contact" passHref>
          <li className={styles.listItem}>Contacto</li>
          </Link>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width={30} height={30} />
            <div className={styles.counter}>{quantity}</div> 
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
