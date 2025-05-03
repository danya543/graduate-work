import LocalStorageService from '@applicationStorage/LocalStorage';
import { ModalType } from '@components/constants';
import { ModalProps } from '@src/types/Modal';
import { InputRegex } from '@utils/constants';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import styles from './Modal.module.scss';

export const Modal = (props: ModalProps) => {
  const [parsedKeys, setParsedKeys] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { onClose, type, boxes, setBoxes } = props;

  useEffect(() => {
    const keys = LocalStorageService.getConfigKeys();
    setParsedKeys(keys);
  }, []);

  const validationSchema = Yup.object({
    configName: Yup.string()
      .matches(InputRegex.SaveInput, 'Недопустимые символы')
      .required('Обязательное поле')
      .notOneOf(parsedKeys, 'Конфигурация с таким именем уже существует'),
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section>
      <h2>
        {type === ModalType.Load
          ? 'Загрузить конфигурацию'
          : 'Сохранить конфигурацию'}
      </h2>
      {type === ModalType.Load ? (
        <Formik
          initialValues={{ configName: '' }}
          onSubmit={() => {
            if (selectedOption) {
              const loadedBoxes = LocalStorageService.loadBoxes(selectedOption);
              setBoxes(loadedBoxes);
              onClose();
            }
          }}>
          <Form>
            <div className={styles.form_group}>
              <h3>Выберите конфигурацию:</h3>
              {parsedKeys.length > 0 ? (
                <div className={styles.options}>
                  {parsedKeys.map((key, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="options"
                        value={key}
                        checked={selectedOption === key}
                        onChange={handleOptionChange}
                        required
                      />
                      {key}
                    </label>
                  ))}
                </div>
              ) : (
                <p>Нет сохраненных конфигураций</p>
              )}
              <button type="submit" disabled={!selectedOption}>
                Выбрать
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <Formik
          initialValues={{ configName: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            if (!parsedKeys.includes(values.configName)) {
              LocalStorageService.saveBoxes(values.configName, boxes);
              onClose();
            }
          }}>
          {({ isValid }) => (
            <Form>
              <div className={styles.form_group}>
                <h3>Введите имя конфигурации:</h3>
                <Field
                  className={styles.saveInput}
                  type="text"
                  name="configName"
                />
                <ErrorMessage
                  name="configName"
                  component="div"
                  className={styles.error}
                />
                <button type="submit" disabled={!isValid}>
                  Сохранить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </section>
  );
};
