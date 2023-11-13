import { OverlayPanel } from 'primereact/overlaypanel';

export function Overlay(props) {
  const { op, image } = props;

  return (
    <div>
      <OverlayPanel ref={op}>
        <img src={image} alt="Bamboo Watch" style={{ maxWidth: '250px', maxHeight: '400px' }} />
      </OverlayPanel>
    </div>
  )
}