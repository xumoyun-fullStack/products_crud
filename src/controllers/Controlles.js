class Controller{
    static async  ProductGet(req, res){
        try{
            const psql = await req.psql;
            const products = await psql.products.findAll();
            res.status(200).json({
                ok: true,
                products
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
            console.log("cont: " + e);
        }
    }

    static async ProductsPost(req, res){
        try{
            const { product_name, product_price } = req.body;
            const psql = await req.psql;
            console.log(true)
            let product = await psql.products.findOne({
                where: {
                    product_name,
                },
                raw: true
            })

            if(product) throw new Error("This product already added") 
            
            
            product = await psql.products.create({
                product_name,
                product_price,
            },{
                raw: true,
            });

            res.status(200).json({
                ok: true,
                product
            })

        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
            console.log("cont: " + e)
        }
    }

    static async DeleteProductPost(req, res){
        try{
            const psql = await req.psql;
            const {product_name} = req.body;

            let product = await psql.products.findOne({
                where: {
                    product_name,
                },
                
                raw: true,
                
            })

            if(!product) throw new Error("Product not found!");

            product = await psql.products.destroy({
                where:{
                    product_name,
                }   
            })

            res.status(200).json({
                ok: true,
                message: "Deleted"
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
            console.log("delete: " + e);
        }
    }

    static async UpdateNamePost(req, res){
        try{
            const psql = await req.psql;
            let { product_name, new_name } =req.body;

            let product = await psql.products.findOne({
                where:{
                    product_name,
                }
            })

            if(!product) throw new Error("Product not found!");
            
            await psql.products.update({
                product_name: new_name
            },{
                where:{
                    product_name,
                }
            })

            res.status(200).json({
                ok: true,
                new_name,
                message: "updated"
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async UpdatePricePost(req, res){
        try{
            const psql = await req.psql;
            let { product_name, new_price } =req.body;
            let product = await psql.products.findOne({
                where:{
                    product_name,
                }
            })

            if(!product) throw new Error("Product not found!");

            await psql.products.update({
                product_price: new_price
            },{
                where:{
                    product_name,
                }
            })

            res.status(200).json({
                ok: true,
                new_price,
                message: "updated"
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
}

module.exports = Controller;