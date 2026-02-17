import styles from './styles.module.css';

type DefaultButtonProps = {
    icon?: React.ReactNode;
    Color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export default function DefaultButton ({icon, color='green', ...props}: DefaultButtonProps){
    return (
    <>
         
         <button className={`${styles.button} ${styles[color]}`} {...props} >
            {icon}
         </button>
    </>
    );
}