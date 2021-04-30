const mysql = require('../mysql').pool;

exports.getProjeto = (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM projeto',
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}
                const response = {
                    projeto: resultado.map(prod => {
                      return{
                          id: prod.id,
                          nome: prod.nome,
                          situacao: prod.situacao,
                          viabilidade: prod.viabilidade,
                          dataInicio: prod.dataInicio,
                          dataFinal: prod.dataFinal,
                          request: {
                              tipo: 'GET',
                              descricao: 'Retornar todos os Projetos',
                              url: 'http://localhost:3000/projeto/' + prod.id
                          }
                      }  
                    })
                }
                return res.status(200).send({response})
            })
    });
};

exports.postProjeto = (req,res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO projeto (nome, situacao, viabilidade, dataInicio, dataFinal) VALUE (?,?,?,?,?)',
            [req.body.nome,
            req.body.situacao, 
            req.body.viabilidade, 
            req.body.dataInicio, 
            req.body.dataFinal],
            (error, resultado, field) =>{
              conn.release();  
              if (error) {return res.status(500).send({error: error})}
               const response = {
                   mensagem: 'Projeto Inserido',
                   projetoCriado:{
                       nome:resultado.nome,
                       situacao: req.body.situacao,
                       viabilidade: req.body.viabilidade,
                       dataInicio: req.body.dataInicio,
                       dataFinal: req.body.dataFinal,
                       request: {
                        tipo: 'GET',
                        descricao: 'Cria Projetos',
                        url: 'http://localhost:3000/projeto' +"projeto"
                    }
                 }
               }
             return res.status(201).send({response});
        })
    });
};

exports.getProjetoId = (req,res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM projeto WHERE id = ?',
            [req.params.id],
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}

                if (resultado.length==0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado projetos com esse ID'
                    })
                }
                const response = {
                    buscaProjetos:{
                        id: resultado[0].id,
                        nome: resultado[0].nome,
                        situacao: resultado[0].situacao,
                        viabilidade: resultado[0].viabilidade,
                        dataInicio: resultado[0].dataInicio,
                        dataFinal: resultado[0].dataFinal,
                        request: {
                         tipo: 'GET',
                         descricao: 'Retorna Projetos',
                         url: 'http://localhost:3000/projeto/'  
                     }
                  }
                }
                return res.status(200).send({response})
            })
    });
};

exports.patchProjeto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'UPDATE projeto SET nome =?, situacao = ?, viabilidade = ?, dataInicio = ?,  dataFinal = ? WHERE id = ?',
            [req.body.nome,
            req.body.situacao, 
            req.body.viabilidade, 
            req.body.dataInicio, 
            req.body.dataFinal],
            (error, resultado, field) =>{
              conn.release();  

              if (error) {return res.status(500).send({error: error})}
              const response = {
                mensagem: 'Projeto Atualizado',
                projetoAtualizado:{
                    id: req.params.nome,
                    situacao: req.body.situacao,
                    viabilidade: req.body.viabilidade,
                    dataInicio: req.body.dataInicio,
                    dataFinal: req.body.dataFinal,
                    request: {
                     tipo: 'PUT',
                     descricao: 'Projeto atualizados',
                     url: 'http://localhost:3000/projeto/' + req.params.id
                 }
              }
            }
             return res.status(202).send({response});
        })
    });
};

exports.deleteProjeto = (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM projeto WHERE id = ?`,
            [req.body.id],
            (error, resultado, field) =>{
              conn.release();  
              if (error) {return res.status(500).send({error: error})}
              const response ={
                    mensagem: 'Projeto excluido',
                    request: {
                        tipo:'DELETE',
                        descricao: 'Cria novos Projetos',
                        url: 'http://localhost:3000/projeto'    
                    }
                }  
                return res.status(202).send({response });
        })
    });
};