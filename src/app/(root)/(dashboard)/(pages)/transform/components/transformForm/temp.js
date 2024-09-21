;<div className={`dsTransform-control ${acl(!!err.color, 'error')}`}>
  <p className='dsTransform-control__error'>{err.color?.message}</p>
  <div className='dsTransform-input color'>
    <h4 className='dsTransform-input__tag'>Color 🎨</h4>
    <aside className='dsTransform-input__colors'>
      {Object.values(PASTEL_COLORS).map(color => {
        const [from, to] = color
        const bg = `linear-gradient(135deg, ${from}, ${to})`
        return (
          <label key={from} style={{ backgroundImage: bg }}>
            <input type='radio' value={color.join()} {...register('color')} />
          </label>
        )
      })}
    </aside>
  </div>
</div>

const color = watch('color')
useEffect(() => {
  const values = color.split(',')
  if (!Array.isArray(values)) return
  const parent = document.querySelector('body')
  if (!parent || !(parent instanceof HTMLElement)) return
  const [from, to] = values
  parent.style.background = `radial-gradient(
      circle at 20% 0%,
      var(--bg-primary) 10%,
      ${from} 80%,
      ${to} 100%
    )`
  return () => {
    parent.style.background = 'var(--bg-secondary)'
  }
}, [color])
