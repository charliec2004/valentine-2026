import { polaroids } from '../../data/polaroids'
import Polaroid from '../Polaroid/Polaroid'
import styles from './PolaroidScroll.module.css'

export default function PolaroidScroll() {
  return (
    <section className={styles.container} aria-label="Our memories">
      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Our Memories</h2>
        <p className={styles.introSubtitle}>A little journey through us</p>
      </div>

      <div className={styles.polaroidGrid}>
        {polaroids.map((polaroid, index) => (
          <Polaroid
            key={polaroid.id}
            data={polaroid}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
