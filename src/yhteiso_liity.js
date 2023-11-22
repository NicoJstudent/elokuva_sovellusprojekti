import './App.css';
import './monikkotyylit.css';

/* Voisko tätä yhtä pohjaa käyttää kahdelle toiminnolle:
Jos ei kuulu yhteisöön > YhteisoTila_Ei + YhteisoLiityButton_Liity
Jos jo jättänyt liittymispyynnön > YhteisoTila_Odottaa + YhteisoLiityButton_Odottaa
*/

const YhteisoLiity = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>*Yhteisön nimi*</h5>
                <YhteisoTila_Ei />
            </div>
            <div className='section'>
                <YhteisoLiityButton_Liity />
            </div>
        </>
    );
};

const YhteisoTila_Ei = () => {
    return (
        <div className='esittelytxt'>Et kuulu vielä tähän yhteisöön. Voit jättää liittymispyynnön.</div>
    )
}

const YhteisoTila_Odottaa = () => {
    return (
        <div className='esittelytxt'>Olet jättänyt liittymispyynnön.<br/>Odota kunnes ryhmänvetäjä hyväksyy tai hylkää pyyntösi.</div>
    )
}

const YhteisoLiityButton_Liity = () => {
    return (
        <>
            <button className='yleinen_btn levea sininen'>Lähetä liittymispyyntö</button>
        </>
    )
}

const YhteisoLiityButton_Odottaa = () => {
    return (
        <>
            <button className='yleinen_btn levea'>Olet jättänyt liittymispyynnön</button>
        </>
    )
}

export default YhteisoLiity;