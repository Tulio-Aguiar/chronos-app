import styles from './styles.module.css';

type DefaultInputProps = {
    id:string;
    labelText:string;
} & React.ComponentProps<'input'>;

export default function DefaultInput ({id, type, labelText,...rest}: DefaultInputProps){
    return (
    <>
         <label htmlFor={id}>{labelText}</label>
         <input className={styles.input} id={id} type={type} {...rest} placeholder='Digite Algo' />
    </>
    );
}