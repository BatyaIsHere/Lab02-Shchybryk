
let _show_cat=({
	id,
	name
})=>{
	return $(`<p class="load" id="${"" + id+name}">`).text(name);
};

module.exports=_show_cat;