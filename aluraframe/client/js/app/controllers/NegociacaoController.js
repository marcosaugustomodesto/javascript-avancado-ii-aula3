class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');       
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso'; 
        this._limpaFormulario();   

    }
    
    apaga() {
        
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

   importarNegociacoes() {

        let service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);  
    }



	importarNegociacoes_old(){

		/*
		let service = new NegociacaoService();

		service.obterNegociacoesDaSemana()
			.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso';
				   })
			.catch(erro => this._mensagem.texto = erro);
		*/

        
        let service = new NegociacaoService();


		Promise.all([service.obterNegociacoesDaSemanaAnterior(), 
                     service.obterNegociacoesDaSemana(), 
			         service.obterNegociacoesDaSemanaRetrasada()])
		  .then(negociacoes => {
				negociacoes
				   .reduce((arrayachatado, array)=> arrayachatado.concat(array), [])	
                   .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações importadas com sucesso';				
			})
		  .catch(erro => this._mensagem.texto = erro);

        

		/*
		service.obterNegociacoesSemana()
			.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso';
				   })
			.catch(erro => this._mensagem.texto = erro);

		service.obterNegociacoesSemanaAnterior()
			.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso';
				   })
			.catch(erro => this._mensagem.texto = erro);

		service.obterNegociacoesSemanaRetrasada()
			.then(negociacoes => {
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso';
				   })
			.catch(erro => this._mensagem.texto = erro);

		*/

		/*

		service.obterNegociacoesSemana((erro, negociacoes)=>{
			if(erro){
				this._mensagem.texto = erro;
				return;
			} 
			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
			this._mensagem.texto = 'Negociações importadas com sucesso';
		});

		service.obterNegociacoesSemanaAnterior((erro, negociacoes)=>{
			if(erro){
				this._mensagem.texto = erro;
				return;
			} 
			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
			this._mensagem.texto = 'Negociações importadas com sucesso';
		});

		service.obterNegociacoesSemanaRetrasada((erro, negociacoes)=>{
			if(erro){
				this._mensagem.texto = erro;
				return;
			} 
			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
			this._mensagem.texto = 'Negociações importadas com sucesso';
		});
		*/
	}
}