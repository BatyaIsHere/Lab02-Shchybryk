
let _show_description=({
	id,
	name,
	image_url,
	description,
	price,
	special_price
})=>{

	
let $product=$(`<div class="card col-xs-12 col-sm-4 col-md-3 mx-auto" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title mx-auto">`).text(name));
	$product.append($(`<span class="product-description">ОПИС:</span>`).text(description));
    
		if(special_price) {
		$product.append($(`<s class="mx-auto product-price">`).text("Стара ціна: " +price));
		$product.append($(`<span class="mx-auto product-special-price">`).text("Ціна: " +special_price));
        
        
        $product.append($(`<button type="button" class="btn button bg-success product-buy  add_item" data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${special_price}">`).text("До кошику"));
	}else{
        $product.append($(`<span class="mx-auto product-price">`).text("Ціна: " + price));
        
        
         $product.append($(`<button type="button" class="btn button bg-success product-buy  add_item" data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${price}">`).text("До кошику"));
    }
	return $product;
};

module.exports=_show_description;

