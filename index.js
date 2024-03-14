import { curl } from "gabo";
import { Telegraf } from "telegraf";
import { salvarId } from "./utils.js";

const bot = new Telegraf('6951205448:AAFepSU7MzaYJ-N-GipjnZCOxnWQRLzWdeo')
const chatID = 6777455895

async function News() {
    try {


        const res = await curl({
            url: 'http://mobileapi.365scores.com/Data/Dashboard/Light/?apptype=1&appversion=5.7.4&filtersourcesout=true&lang=31&newslang=31&sectioncategories=media&storeversion=5.7.4&theme=dark&tz=93&uc=21&withmainodds=false&withoddspreviews=false&withtransfers=true'
        }, true)
        if (res.statusCode !== 200) return false
        let dados = JSON.parse(res.body)
        let result = dados['Sections'][0]['Data']['Items']
        let newSources = dados['Sections'][0]['Data']['NewsSources']
        let info = result.find(item => salvarId(item))
        const { Title: titulo, Description: descricao, Url: materia, Images, SourceID } = info
        const fonte = newSources.find(item => item.ID === SourceID)
        let imagem = Images[0]['URL']
        return {
            titulo,
            descricao,
            materia,
            imagem,
            fonte: fonte['Name']
        }

        
    } catch (error) {
        console.log('Sem novas noticias!.');
        return false
    }
        
}

async function notificar(dados){
    try {
        await bot.telegram.sendPhoto(chatID, dados.imagem, {
            caption: `<b>${dados.titulo}</b>\n\n<i>${dados.descricao}</i>\n\n📰 <a href="${dados.materia}">${dados.fonte}</a>`,
            parse_mode: 'HTML'  
        })
        return console.log('Materia Enviada com Sucesso!!');
        
    } catch (error) {
        return console.info('nao foi possivel enviar a materia!!..');        
    }
}

setInterval(async () => {
    const news = await News()
    if (news){
        await notificar(news)
    }
}, 60000)
