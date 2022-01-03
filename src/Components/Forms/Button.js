import React from 'react'
import styles from './Button.module.css'

/*Quando abrimos um componente e fechamos o valor de dentro dele é o children no caso o valor está em button no login form que é Entrar, passamos o children para ser o valor para podermos reaproveitar o const button 
para não passar o disable direto e para poder chamar outros propriedades passamos o props e o rest props dentro do const 
*/
const Button = ({children, ...props}) => {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    )
}

export default Button
