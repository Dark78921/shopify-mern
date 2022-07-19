import React, { useState, useEffect, memo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useFormValue from '../../hooks/useFormState';
import { useStateValue } from '../../context/State.Context';

// Statics
import './CreateProduct.css';

interface RouterProps {
  pID: string;
}

const CreateProduct = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const { pID } = useParams<RouterProps>();
  const [productName, handleProductName, resetName, setName] = useFormValue('');
  const [price, handlePrice, resetPrice, setPrice] = useFormValue(0);
  const [img, handleImg, resetImage, setImage] = useFormValue('');
  const [desc, handleDesc, resetDesc, setDesc] = useFormValue('');
  const [
    countInStock,
    handleCountInStock,
    resetCountInStock,
    setShock,
  ] = useFormValue(5);
  const [varified, setVarified] = useState(false);
  const [category, handleCtg, resetCtg, setCtg] = useFormValue('');

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(`/api/p/${pID}`);
        if (!data.product) throw new Error(data.error);
        const product = data.product;
        setName(product.name);
        setPrice(product.price);
        setDesc(product.description);
        setShock(product.countInStock);
        setVarified(product.varified);
        setCtg(product.category);
        setImage(product.images[0]);
      } catch (e) {
        console.log(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [pID]);

  // Functions
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (productName && price && img && desc && countInStock && category) {
        const productData = {
          name: productName,
          price,
          description: desc,
          countInStock,
          varified,
          category,
          images: [img],
        };
        const { data } = await Axios.put(
          `/api/p/${pID}`,
          { ...productData },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        if (data.error) {
          return alert(data.error);
        }
        resetName();
        resetPrice();
        resetImage();
        resetDesc();
        resetCountInStock();
        resetCtg();
        return history.push(`/admin`);
      } else {
        alert('Please Fill Out the Fields');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form className="createProduct" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Product Name"
            value={productName}
            fullWidth
            onChange={handleProductName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="product-price">Price</InputLabel>
            <OutlinedInput
              id="product-price"
              value={price}
              fullWidth
              onChange={handlePrice}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Description"
            multiline
            fullWidth
            rows={4}
            value={desc}
            onChange={handleDesc}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Product Image"
            value={img}
            onChange={handleImg}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="in Shock"
            type="number"
            value={countInStock}
            onChange={handleCountInStock}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Category"
            value={category}
            onChange={handleCtg}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update {productName}
          </Button>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={varified}
                onChange={() => setVarified(!varified)}
                name="Varified"
              />
            }
            label="Varified"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(CreateProduct);
