import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ProjectPortal({ post: Post }: { post: React.ComponentType }) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal === true) {
      const handleEvent = (e: PointerEvent) => {
        const element = modalRef.current;
        if (element && !element.contains(e.target as Node)) {
            setShowModal(false);
        }
      };

      document.addEventListener("pointerdown", handleEvent);

      return () => {
        document.removeEventListener("pointerdown", handleEvent);
      };
    }
  }, [showModal]);

  const handleOpenModal = () => {
    if (showModal === false) {
        setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="portal-open-button" onClick={handleOpenModal}>
        more...
      </button>
      {showModal && createPortal(
        <>
            
            <div ref={modalRef} className="modal">
                <button className="portal-close-button" onClick={handleCloseModal}>X</button>
                <div className="post">
                    <Post />
                </div>
            </div>
        </>,
        document.body
      )}
    </>
  );
}