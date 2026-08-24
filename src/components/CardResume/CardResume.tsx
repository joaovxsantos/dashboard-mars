import { CardResumeProps } from '@/src/interface';
import styles from './CardResume.module.scss';

export function CardResume({ label, title, flag }: CardResumeProps) {
    return (
        <div className={`${styles["card-resume-container"]} ${styles[flag]} `}>
            <h3>{title}</h3>
            <label>{label}</label>
        </div>
    )
}