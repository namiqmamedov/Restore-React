import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import agent from "../api/agent";
import AppTextInput from "../components/UI/AppTextInput/AppTextInput";
import useProducts from "../hooks/useProducts";
import { Product } from "../models/product";
import { useAppDispatch } from "../store/configureStore";
import AppSelectList from "../components/UI/AppSelectList/AppSelectList";
import AppDropzone from "../components/UI/AppDropzone/AppDropzone";
import { validationSchema } from "../validation/productValidation";

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
    const { control  , reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
        // resolver: yupResolver(validationSchema)
    });
    const { brands, types } = useProducts();
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (product && !watchFile && !isDirty) reset(product);
    //     return () => {
    //         if (watchFile) URL.revokeObjectURL(watchFile.preview);
    //     }
    // }, [product, reset, watchFile, isDirty])


    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
                </Typography>
            <form >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={brands} name='brand' label='Brand' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={types} name='type' label='Type' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} multiline={true} rows={4} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
                            ) : (
                                <img src={product?.pictureURL} alt={product?.name} style={{ maxHeight: 200 }} />
                            )}
                        </Box>

                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}