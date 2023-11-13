import { useState, useEffect } from 'react';
import { Dialog } from "primereact/dialog";
import { Form } from 'react-bootstrap';
import { FiEdit, FiPlusCircle, FiSave, FiXCircle } from 'react-icons/fi';

import { Input } from "@/components/Input";

import { createProduct, updateProduct } from '@/services/resources/productResource';

export function ProductDialog(props) {
  const { showDialog, closeDialog, product, onConfirm, user } = props;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [voltage, setVoltage] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [ean, setEan] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    if(product) {
      setId(product.id);
      setName(product.name);
      setModel(product.model);
      setCategory(product.category);
      setBrand(product.brand);
      setVoltage(product.voltage);
      setValue(product.value);
      setQuantity(product.quantity);
      setImage(product.image);
      setActive(product.active);
      setEan(product.ean);
    }
  }, [product])

  const handleClickSave = async () => {
    let data =  { name, model, category, brand, voltage, value, quantity, image, ean };
    const savedProduct = await createProduct(data);
    if (savedProduct)
      await onConfirm();
  }

  const handleClickUpdate = async () => {
    let data =  { name, model, category, brand, voltage, value, quantity, image, ean };
    const updatedProduct = await updateProduct(id, data);
    if(updatedProduct)
      await onConfirm();
  }

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        { product ? (
          <FiEdit size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) : (
          <FiPlusCircle size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) }
        Cadastro Produto
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        { user && user.admin ? (
          <button type="button" className="btn btn-success" 
            onClick={ product ? handleClickUpdate : handleClickSave } style={{marginRight: '30px'}}>
            <FiSave size={16} style={{marginTop:'-2px'}}/> {product ? `Atualizar` : `Cadastrar`} 
          </button>
        ) : ( <></> ) }
          <button type="button" className="btn btn-danger" onClick={ closeDialog }>
            <FiXCircle size={16} style={{marginTop:'-2px'}}/> Fechar
          </button>
      </div>
    )
  }

  return(
    <Dialog header={ dialogHeader } visible={ showDialog } style={{ width: '30vw' }} 
      onHide={ closeDialog } footer={ dialogFooter } product={product} > 
      { product ? (
        <>
        <Input label='Situação' type='text' value={active ? 'Ativo' : 'Inativo'} disabled />
        <Input label='Id' type='text' placeholder='Id' value={id} disabled />
        <Input label='Descrição' type='text' placeholder='Descrição' value={name} onChange={e => setName(e.target.value)} disabled={!user.admin}  />
        <Input label='Modelo' type='text' placeholder='Modelo' value={model} onChange={e => setModel(e.target.value)} disabled={!user.admin} />
        <Input label='Marca' type='text' placeholder='Marca' value={brand} onChange={e => setBrand(e.target.value)} disabled />
        <Input label='Categoria' type='text' placeholder='Categoria' value={category} onChange={e => setCategory(e.target.value)} disabled />
        <Input label='Voltagem' type='text' placeholder='Voltagem' value={voltage} onChange={e => setVoltage(e.target.value)} disabled={!user.admin} />
        <Input label='Preço' type='text' placeholder='Preço' value={value} onChange={e => setValue(e.target.value)} disabled={!user.admin} />
        <Input label='Quantidade' type='text' placeholder='Quantidade' value={quantity} onChange={e => setQuantity(e.target.value)} disabled={!user.admin} />
        <Input label='Código EAN' type='text' placeholder='Código EAN' value={ean} onChange={e => setEan(e.target.value)} disabled={!user.admin} />
        <Input label='URL Imagem' type='text' placeholder='URL imagem' value={image} onChange={e => setImage(e.target.value)} disabled={!user.admin} />
        </>
      ): (
        <>
        <Form.Group className='mb-3'>
          <Form.Select aria-label="Selecione a categoria" value={category} onChange={e => setCategory(e.target.value)}>
            <option value={null}>Selecione a categoria</option>
            <option value="Refrigerador">Refrigerador</option>
            <option value="Freezer">Freezer</option>
            <option value="Peças">Peças</option>
          </Form.Select>
        </Form.Group>
        <Input type='text' placeholder='Descrição' value={name} onChange={e => setName(e.target.value)} />
        <Input type='text' placeholder='Modelo' value={model} onChange={e => setModel(e.target.value)} />
        <Input type='text' placeholder='Marca' value={brand} onChange={e => setBrand(e.target.value)} />
        <Input type='text' placeholder='Voltagem' value={voltage} onChange={e => setVoltage(e.target.value)} />
        <Input type='text' placeholder='Preço' value={value} onChange={e => setValue(e.target.value)} />
        <Input type='text' placeholder='Quantidade' value={quantity} onChange={e => setQuantity(e.target.value)} />
        <Input ltype='text' placeholder='Código EAN' value={ean} onChange={e => setEan(e.target.value)} />
        <Input ltype='text' placeholder='URL imagem' value={image} onChange={e => setImage(e.target.value)} />
        </>
      ) }
    </Dialog>
  )
}