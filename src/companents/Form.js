import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "reactstrap";
import "./form.css";
import Header from "./Header";

const dummyData = {
  name: "",
  tel: "",
  adres: "",
  pizzatur: "",
  pizzaboyut: "",
  pizzakenar: "",
  extra: [],
  not: "",
  siparis: 0,
};
const dummyDataErrors = {
  name: "",
  tel: "",
  adres: "",
  pizzatur: "",
  pizzaboyut: "",
  pizzakenar: "",
  extra: [],
  not: "",
  siparis: "",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "minimum 2 karakter olmalıdır.")
    .required("lütfen adınızı giriniz."),

  adres: yup
    .string()
    .min(5, "adres minimum 5 karakter olmalıdır.")
    .required("lütfen adres kısmını doldurunuz."),

  tel: yup
    .number()
    .min(10, "telefon numarası minimum 10 haneli olmalıdır.")
    .required("lütfen telefon numaranızı giriniz.")
    .typeError("Telefon numarası sayı olmalıdır."),

  not: yup.string(),

  siparis: yup
    .number()
    .min(1, "sipariş minimum 1 adet olmalıdır.")
    .typeError("Sipariş adedi sayı olmalıdır.")
    .required("lütfen sipariş adedini seçin"),

  pizzatur: yup
    .mixed()
    .oneOf(
      ["karisik", "margarita", "sucuksever", "vejeteryan"],
      "lütfen pizzanızı seçin."
    )
    .required(),

  pizzakenar: yup
    .mixed()
    .oneOf(
      ["incekenar", "klasikkenar", "mozerellakenar", "sarimsakkenar"],
      "lütfen kenar seçin."
    )
    .required(),

  pizzaboyut: yup
    .mixed()
    .oneOf(
      ["kucukboy", "ortaboy", "buyukboy", "megaboy"],
      "lütfen pizza boyutunu seçin"
    )
    .required(),
});

function Form() {
  const [formData, setFormData] = useState(dummyData);
  const [errors, setErrors] = useState(dummyDataErrors);
  const [disabled, setDisabled] = useState(true);
  const [gelenSiparis, setGelenSiparis] = useState(false);

  useEffect(() => {
    schema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  const checkErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked, id } = event.target;

    if (type === "checkbox") {
      if (checked) {
        let ext = formData.extra;
        let arr = [...ext];
        arr.push(id);
        setFormData({ ...formData, [name]: arr });
      } else {
        let ext = formData.extra;
        let arr = [...ext];
        arr.splice(arr.indexOf(id), 1);
        setFormData({ ...formData, [name]: arr });
      }
    } else {
      checkErrors(name, value);
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formData)
      .then((res) => {
        console.log(res.data);
        setGelenSiparis(true);

        setTimeout(() => {
          setGelenSiparis(false);
        }, 2000);

        setFormData({
          name: "",
          tel: "",
          adres: "",
          pizzatur: "",
          pizzaboyut: "",
          pizzakenar: "",
          extra: [],
          not: "",
          siparis: 0,
        });
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          {gelenSiparis && (
            <Alert color="primary">
              Siparişiniz alındı.Koppernik pizzası afiyetler diler.
            </Alert>
          )}
        </div>
        <div className="bilgi-section">
          <div>
            <p htmlFor="name">
              <b>İsim Soyisim</b>
            </p>
            <div>
              <input
                type="text"
                name="name"
                placeholder="İsim soyisim giriniz"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="errors">{errors.name}</div>
          </div>

          <div>
            <p htmlFor="tel">
              <b>Tel No</b>
            </p>
            <div>
              <input
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Telefon numaranızı giriniz"
              />
            </div>
            <div className="errors">{errors.tel}</div>
          </div>

          <div>
            <p htmlFor="adres">
              <b>Adres</b>
            </p>
            <div>
              <input
                type="text"
                name="adres"
                placeholder="Adresinizi giriniz"
                value={formData.adres}
                onChange={handleChange}
              />
            </div>
            <div className="errors">{errors.adres}</div>
          </div>
        </div>
        <div className="container">
          <div className="pizza-section">
            <div className="pizzasec">
              <label htmlFor="pizzatur">Pizzanızı seçin</label>
              <select
                name="pizzatur"
                value={formData.pizzatur}
                onChange={handleChange}
              >
                <option value="seciniz">Seçiniz</option>
                <option value="karisik">Karışık Pizza</option>
                <option value="margarita">Margarita Pizza</option>
                <option value="sucuksever">Sucuksever Pizza</option>
                <option value="vejeteryan">Vejeteryan Pizza</option>
              </select>
              <div className="errors">{errors.pizzatur}</div>

              <label htmlFor="pizzaboyut">Pizza boyutunu seçiniz</label>
              <select
                name="pizzaboyut"
                value={formData.pizzaboyut}
                onChange={handleChange}
              >
                <option value="seciniz">Seçiniz</option>
                <option value="kucukboy">Küçük Boy</option>
                <option value="ortaboy">Orta Boy</option>
                <option value="buyukboy">Büyük Boy</option>
                <option value="megaboy">Mega Boy</option>
              </select>
              <div className="errors">{errors.pizzaboyut}</div>
              <label htmlFor="pizzakenar">Pizza Kenarını seçiniz</label>
              <select
                name="pizzakenar"
                value={formData.pizzakenar}
                onChange={handleChange}
              >
                <option value="seciniz">Seçiniz</option>
                <option value="incekenar">İnce Kenar</option>
                <option value="klasikkenar">Klasik Kenar</option>
                <option value="sarimsakkenar">Sarımsak Kenar</option>
                <option value="mozerellakenar">Mozerella Kenar</option>
              </select>
              <div className="errors">{errors.pizzakenar}</div>
            </div>
          </div>
          <div className="extra">
            <label htmlFor="extra">Extra Malzemeleri Seçin:</label>

            <div>
              <input
                type="checkbox"
                name="extra"
                id="sos"
                onChange={handleChange}
                checked={formData.extra.includes("sos")}
              />
              <label htmlFor="sos">Extra Sos</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="extra"
                id="mozerella"
                onChange={handleChange}
                checked={formData.extra.includes("mozerella")}
              />
              <label htmlFor="mozerella">Extra Mozerella Peynir</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="extra"
                id="acı"
                onChange={handleChange}
                checked={formData.extra.includes("acı")}
              />
              <label htmlFor="acı">Extra Acı</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="extra"
                id="mantar"
                onChange={handleChange}
                checked={formData.extra.includes("mantar")}
              />
              <label htmlFor="mantar">Extra Mantar</label>
            </div>
          </div>
          <div className="not-siparis">
            <div className="not">
              <label htmlFor="not">Notunuzu Ekleyin</label>
              <br />
              <input
                type="text"
                name="not"
                value={formData.not}
                onChange={handleChange}
              />
            </div>
            <div className="errors">{errors.not}</div>
            <div className="siparis">
              <div>
                <b>Sipariş Adet</b>
              </div>
              <input
                type="number"
                name="siparis"
                min="1"
                value={formData.siparis}
                onChange={handleChange}
              />
              <div className="errors">{errors.siparis}</div>
              <input
                type="submit"
                name="siparisonay"
                value="Siparişi Gönder"
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
