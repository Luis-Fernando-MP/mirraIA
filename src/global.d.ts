declare namespace JSX {
  interface IntrinsicElements {
    'two-up': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      orientation?: 'horizontal' | 'vertical'
    }
  }
}
