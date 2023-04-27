import React, { useContext, useEffect, useRef, useState } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {useReactToPrint} from 'react-to-print'
import AuthContext from '../context/AuthContext';
import API from '../api/API';
import dayjs from 'dayjs';

// Create styles
const styles = StyleSheet.create({
  page: {
  },
  container:{
    padding:'2% 10%',
  },
  section: {
    display:'block',
    fontWeight:'normal',
  },
  head:{
    textAlign: 'center',
    width: '100%',
    margin: '3px 0',
  },
  entete:{
    textAlign: 'center',
    backgroundColor: '#ebebeb',
    fontSize: 15
  },
  p:{
    margin: '10px 0',
    fontSize: 13
  },
  span:{
    marginLeft: '6%',
    marginRight: '3%',
  },
  visa:{
    marginLeft: '3%',
    marginRight: '3%',
  },
  ul:{
    listStyle: 'none',
    fontWeight: 'bold',
    fontSize: 13
  }
});
const FormPDF = ({id_demande}) => {
    // id_demande = 2
    const {auth} = useContext(AuthContext)
    const componentRef = useRef();
    const [demande,setDemande] = useState()
    const [rh,setRh] = useState()

    const printData =useReactToPrint({
        content :()=>componentRef.current,
        documentTitle : 'conge',
        onafterprint:()=> alert('mohahaha'),
    })
    const nouvelle = ()=>{
      API.get(`api/info-demande/${id_demande}`)
      .then((response)=>{
          setDemande(response?.data)
      })
    }
    const gestionRH = ()=>{
      API.get(`api/rh/?demande=${id_demande}`)
      .then((response)=>{
          setRh(response?.data[0])
      })
      .then(()=>setInterval(printData(),5000))
    }
    useEffect(()=>{
        nouvelle()
        gestionRH()
    },[id_demande])
    // useEffect(()=>{
    //   {setInterval(printData(),5000)}
    // },[id_demande])
  return (
      <div style={styles.container} ref={componentRef}>
          <Document>
              <Page size="A5" style={styles.page}>
              <div style={styles.head}>
                <h3 style={{color:'#000'}}>FORMULAIRE DE DEMANDE DE CONGE</h3>
              </div>
              <div style={styles.entete}>
                  <p className='p-pdf'>Partie I (remplir par le demandeur)</p>
              </div>
              <div style={styles.section}>
                <p style={styles.p}>Prenom et Nom: <span style={styles.span}>{demande?.user?.first_name} {demande?.user?.last_name}</span></p>
                <p style={styles.p}>Titre/Fonction/Poste: <span style={styles.span}>User1 User1</span></p>
                <p style={styles.p}>Direction: <span style={styles.visa}>{demande?.user.profile?.direction}</span> Post: <span style={styles.visa}>{demande?.user.profile?.Poste}</span> Matricule: <span style={styles.visa}>{demande?.user.profile.matricule}</span></p>
                <p style={styles.p}>Nombre d'annees d'anciennete: <span style={styles.span}>{dayjs().diff(demande?.user.profile?.dateCommance,'year')}</span></p>
                <p style={styles.p}>Nombre d'enfants a charges, de moins de 14 ans: <span style={styles.span}>{demande?.nbenf}</span></p>
              </div>
              <div style={styles.section}>
                <p style={styles.p}>Type de Conges : </p>
                <ul style={styles.ul}>
                    <li style={{marginLeft:10}}>{demande?.typecongee}</li>
                    <ul style={styles.ul}>
                    {demande?.excep === null ? null : <li style={{marginLeft:20}}>{demande?.excep}</li>}
                    </ul>
                </ul>
              </div>
              <div style={styles.section}>
                  <p style={styles.p}>Nombre de jours ouvrés demandés: 24</p>
                  <p style={styles.p}>Période Sollicitée: {demande?.dureeCongee}</p>
                      <p style={styles.p}>Date de Reprise prévue: {dayjs(demande?.dateCongee).add(demande?.dureeCongee,'day').format('YYYY-MM-DD')}</p>
                      <p style={styles.p}>Date de Reprise réelle:</p>
                      <p style={styles.p}>Nom, Fonction et signature de l'intérimaire si applicable:</p>
                  <p style={styles.p}>Signature:</p>    
                  <p style={styles.p}>Date: {demande?.dateCongee}</p>    
              </div>
              <div style={styles.entete}><span style={styles.span}>Partie II Remplir par responsable RH</span></div>
              <div>
                  <p style={styles.p}>Solde en jours de conges: <span style={styles.span}>{rh?.solde_jours}UM</span> jours a la date du: <span style={styles.span}>{rh?.jours_date}</span></p>
                  <p style={styles.p}>Visa RH: <span style={styles.visa}>{rh?.visa_rh}</span></p>
                  <p style={styles.p}>Visa DRH: <span style={styles.visa}>{rh?.visa_drh}</span></p>
                  <p style={styles.p}>Commentaire: <span style={styles.span}>{rh?.comentaire}</span></p>
              </div>
              <div style={styles.entete}><span style={styles.span}>Partie III</span></div>
              <div>
                  <p style={styles.p}>Signature du Superieur hierarchique: <span style={styles.span}>_____________________</span></p>
                  <p style={styles.p}>Date: <span style={styles.span}>2023-04-12</span></p>
              </div>
              </Page>
          </Document>
          {/* {setInterval(printData(),2000)} */}
      </div>
  )
}

export default FormPDF