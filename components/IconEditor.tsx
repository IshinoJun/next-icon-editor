import React, { useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';
import Image from 'next/image';

import styles from '../styles/IconEditer.module.scss';
import Slider from 'rc-slider/lib/Slider';
import pica from 'pica';
import 'rc-slider/assets/index.css';

interface Props {
  previewIcon: File | null;
  onChangePreviewIcon: (iconFile: File | null) => void;
  onChangeIcon: (iconFile: File | null) => void;
}

const ICON_WIDTH = 160 as const;
const ICON_HEIGHT = 160 as const;

export const IconEditor: React.FC<Props> = (props: Props) => {
  const { previewIcon, onChangeIcon, onChangePreviewIcon } = props;
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);

  const handleClickFileSave = useCallback(async () => {
    if (!editorRef.current) return;

    const img = editorRef.current.getImage();
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.width = ICON_WIDTH;
    canvas.height = ICON_HEIGHT;
    const picaCanvas = await pica().resize(img, canvas, { alpha: true });

    picaCanvas.toBlob((blob) => {
      const nextFile = new File([blob], previewIcon.name, {
        type: previewIcon.type,
        lastModified: Date.now(),
      });
      onChangeIcon(nextFile);
      handleCloseIsOpen();
    });

  }, [previewIcon, onChangeIcon]);

  const handleCloseIsOpen = useCallback(() => {
    onChangePreviewIcon(null);
  }, [onChangePreviewIcon]);

  const handleChangeScale = useCallback((value: number) => {
    setScale(value);
  },[]);

  return (
    <Modal
      isOpen={!!previewIcon}
      onRequestClose={handleCloseIsOpen}
      ariaHideApp={false}
      overlayClassName={{
        base: styles.overlayBase,
        afterOpen: styles.overlayAfter,
        beforeClose: styles.overlayBefore,
      }}
      className={{
        base: styles.contentBase,
        afterOpen: styles.contentAfter,
        beforeClose: styles.contentBefore,
      }}
      closeTimeoutMS={500}
    >
      <div className={styles.header}>
        <button onClick={handleCloseIsOpen} type="button">
          <Image
            width={48}
            height={48}
            src="/close.svg"
            alt="アイコン編集閉じる"
          />
        </button>
      </div>
      <div className={styles.iconUploader}>
        <div>
          <AvatarEditor
            ref={editorRef}
            image={previewIcon ? URL.createObjectURL(previewIcon) : ''}
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
            borderRadius={100}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
          <div className={styles.sliderWarp}>
            <Slider
              onChange={handleChangeScale}
              min={1}
              max={1.5}
              step={0.01}
              defaultValue={1}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleClickFileSave}>確定</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
