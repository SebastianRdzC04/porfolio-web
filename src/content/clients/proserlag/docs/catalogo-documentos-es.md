---
title: Catalogo explicativo de tipos y subtipos de documentos
description: Explicacion simple de como se clasifica la informacion documental del despacho.
docType: Catalogo
order: 1
path: catalogo-documentos
clientPath: proserlag
lang: es
---

# Catálogo explicativo de tipos y subtipos de documentos

Este documento resume `infrastructure/db/init/01-documents.sql` en lenguaje simple. La idea es que alguien sin formación jurídica pueda entender cómo se van a clasificar los archivos de un despacho de abogados sin tener que leer SQL.

## Dónde vive la clasificación en la base

- `document_types` guarda las familias grandes de documentos.
- `document_subtypes` guarda los detalles concretos dentro de cada familia.
- `documents` guarda cada archivo con su tipo y subtipo principal.
- `document_classifications` permite clasificaciones extra, pero la principal siempre debe coincidir con el archivo.

En pocas palabras: primero se elige la familia, luego el subtipo exacto.

## Cómo leerlo

- `tipo` = categoría grande.
- `subtipo` = documento específico dentro de esa categoría.
- Si un nombre aparece en más de una familia, manda el contexto: quien lo emite, para que sirve y en que tramite aparece.
- `OTRO` y `NO_CLASIFICADO` son la salida de respaldo para lo que no encaja en las opciones anteriores.

## Regla práctica

1. Si el archivo inicia, responde o mueve un caso, suele ser `ESCRITO_PROCESAL`.
2. Si es una decision del juez o tribunal, suele ser `RESOLUCION_JUDICIAL`.
3. Si deja constancia de una actuacion dentro del expediente, suele ser `ACTUACION_PROCESAL`.
4. Si sirve para probar un hecho, suele ser `PRUEBA`.
5. Si es un acuerdo entre personas o empresas, suele ser `CONTRATO_CONVENIO`.
6. Si lo formaliza un notario o un registro, suele ser `NOTARIAL_REGISTRAL`.
7. Si lo emite una autoridad administrativa, suele ser `ADMINISTRATIVO_AUTORIDAD`.
8. Si trata de impuestos, facturas o contabilidad, suele ser `FISCAL_CONTABLE`.
9. Si trata de trabajo, IMSS o conciliacion laboral, suele ser `LABORAL_SEGURIDAD_SOCIAL`.
10. Si pertenece a una sociedad o empresa, suele ser `CORPORATIVO_MERCANTIL`.
11. Si identifica a una persona, suele ser `IDENTIFICACION_PERSONAL`.
12. Si no encaja en nada de lo anterior, se usa `OTRO`.

## Casos que se pueden confundir

- `CITATORIO` puede ser judicial o administrativo. La diferencia la marca quien lo emite y el contexto.
- `INSPECCION_JUDICIAL` puede ser una actuacion del expediente o un medio de prueba.
- `ESTADO_DE_CUENTA` puede servir como prueba en un juicio o como soporte fiscal/contable.
- `OFICIO` no es lo mismo que `OFICIO_JUDICIAL`.
- `ACUERDO` judicial no es `ACUERDO_ADMINISTRATIVO`.
- `CONVENIO` puede ser judicial, extrajudicial o laboral.
- `RECURSO_REVOCACION` en general no es lo mismo que `RECURSO_REVOCACION_FISCAL`.

## Resumen de tipos

| Tipo | Idea simple |
| --- | --- |
| `ESCRITO_PROCESAL` | Es lo que una parte presenta para iniciar, contestar o impulsar un caso. |
| `RESOLUCION_JUDICIAL` | Es una decision emitida por un juez o tribunal. |
| `ACTUACION_PROCESAL` | Es la constancia de lo que pasa dentro del expediente. |
| `PRUEBA` | Es lo que se usa para demostrar un hecho. |
| `CONTRATO_CONVENIO` | Son acuerdos entre personas, empresas o instituciones. |
| `NOTARIAL_REGISTRAL` | Son documentos formalizados por notario o registrados oficialmente. |
| `ADMINISTRATIVO_AUTORIDAD` | Son documentos emitidos por autoridades administrativas. |
| `FISCAL_CONTABLE` | Son documentos de impuestos, contabilidad y soporte financiero. |
| `LABORAL_SEGURIDAD_SOCIAL` | Son documentos de trabajo, IMSS y conciliacion laboral. |
| `CORPORATIVO_MERCANTIL` | Son documentos internos de sociedades y empresas. |
| `IDENTIFICACION_PERSONAL` | Son documentos que identifican a una persona o acreditan datos basicos. |
| `OTRO` | Es la categoria de respaldo para lo que no entra en las demas. |

## Tipos y subtipos

### `ESCRITO_PROCESAL` - Escrito procesal

Documentos que una parte, su abogado o su representante presenta para iniciar, contestar, corregir, pedir o impugnar algo dentro de un caso.

- `DEMANDA_INICIAL`: se usa para empezar un juicio o una reclamacion.
- `CONTESTACION_DEMANDA`: es la respuesta formal a la demanda.
- `RECONVENCION`: cuando quien fue demandado tambien reclama algo contra quien lo demando.
- `AMPLIACION_DEMANDA`: se usa para agregar hechos, peticiones o detalles a una demanda ya presentada.
- `CONTESTACION_AMPLIACION`: es la respuesta a esa ampliacion.
- `INCIDENTE`: es una cuestion secundaria dentro del asunto principal.
- `CONTESTACION_INCIDENTE`: es la respuesta a un incidente.
- `PROMOCION_TRAMITE`: es una solicitud simple para mover, aclarar o agilizar el expediente.
- `OFRECIMIENTO_PRUEBAS`: se usa para presentar y relacionar pruebas.
- `OBJECION_PRUEBAS`: se usa para cuestionar o impugnar pruebas de la otra parte.
- `ALEGATOS`: son los argumentos finales sobre los hechos, las pruebas y el derecho.
- `DESISTIMIENTO`: se usa para renunciar al juicio, al recurso o a la instancia.
- `RECURSO_APELACION`: se usa para pedir que un superior revise una decision.
- `RECURSO_REVOCACION`: se usa para pedir que la misma autoridad cambie una decision simple o de tramite.
- `RECURSO_QUEJA`: se usa para reclamar un agravio procesal.
- `RECURSO_REVISION`: se usa cuando la ley permite pedir una revision mas amplia.
- `APELACION_ADHESIVA`: se usa para sumarse a una apelacion ya presentada por la otra parte.
- `DEMANDA_AMPARO_INDIRECTO`: se usa para reclamar actos de autoridad que no son una sentencia definitiva.
- `DEMANDA_AMPARO_DIRECTO`: se usa para reclamar una sentencia definitiva o un laudo.
- `INFORME_PREVIO`: es la respuesta inicial de la autoridad en un juicio de amparo.
- `INFORME_JUSTIFICADO`: es la respuesta donde la autoridad explica y defiende el acto reclamado.
- `CUMPLIMIENTO_REQUERIMIENTO`: se usa para atender una prevencion o un requerimiento.
- `EXCEPCIONES_DEFENSAS`: se usa para plantear las defensas de forma o de fondo.
- `SOLICITUD_COPIAS`: se usa para pedir copias simples o certificadas del expediente.
- `RATIFICACION_ESCRITO`: se usa para confirmar un escrito, una firma o una manifestacion.
- `SUSTITUCION_PODER`: se usa para sustituir o delegar la representacion otorgada.
- `RENUNCIA_REPRESENTACION`: se usa para dejar de representar o patrocinar a alguien.
- `OTRO_ESCRITO`: es cualquier otro escrito procesal que no encaje en los anteriores.

### `RESOLUCION_JUDICIAL` - Resolucion judicial

Documentos que salen del juez, tribunal u organo jurisdiccional para decidir algo o mover el proceso. `ACUERDO`, `DECRETO` y `PROVIDENCIA` suelen ser resoluciones cortas de tramite; no son la sentencia final.

- `AUTO_RADIACION`: es el acto con el que se registra formalmente el asunto.
- `AUTO_ADMISION`: es la decision que admite una demanda, promocion o prueba.
- `AUTO_PREVENCION`: es la decision que pide corregir o completar algo.
- `AUTO_APERTURA_PRUEBAS`: es la decision que abre la etapa de pruebas.
- `AUTO_CIERRE_INSTRUCCION`: es la decision que cierra la etapa de instruccion para resolver.
- `ACUERDO`: es una resolucion breve de tramite o impulso procesal.
- `DECRETO`: es una determinacion simple sobre un punto del procedimiento.
- `PROVIDENCIA`: es una resolucion de mero tramite.
- `SENTENCIA_INTERLOCUTORIA`: resuelve una cuestion incidental o accesoria.
- `SENTENCIA_DEFINITIVA`: resuelve el fondo del asunto.
- `LAUDO`: es la resolucion final en materia laboral o arbitral cuando corresponde.
- `RESOLUCION_INCIDENTAL`: resuelve un incidente dentro del expediente.
- `EJECUTORIA`: es una resolucion firme o ya declarada firme.
- `REQUERIMIENTO_JUDICIAL`: es una orden del juez para cumplir, exhibir o informar algo.
- `MEDIDA_CAUTELAR`: es una decision provisional para proteger algo mientras se resuelve el asunto.
- `OTRA_RESOLUCION`: es cualquier otra resolucion judicial que no encaje en las anteriores.

### `ACTUACION_PROCESAL` - Actuacion procesal

Documentos que dejan constancia de una actuacion dentro del expediente. Aqui importa lo que paso en el procedimiento, no tanto el fondo del conflicto.

- `NOTIFICACION_PERSONAL`: es la notificacion hecha directamente a la parte o a su representante.
- `NOTIFICACION_POR_LISTA`: es la notificacion publicada en lista, boletin o estrados electronicos.
- `NOTIFICACION_POR_ESTRADOS`: es la notificacion colocada en estrados fisicos o electronicos.
- `CEDULA_NOTIFICACION`: es el documento que acredita que una notificacion se realizo.
- `EMPLAZAMIENTO`: es la citacion formal para llamar a juicio o hacer saber una demanda.
- `CITATORIO`: es la citacion para que alguien comparezca en una fecha y hora dentro del proceso.
- `RAZON_ACTUARIAL`: es la nota del actuario sobre lo que hizo o vio en la diligencia.
- `DILIGENCIA`: es cualquier actuacion material realizada por una autoridad o fedatario.
- `COMPARECENCIA`: es la presentacion personal de una parte, testigo o tercero ante la autoridad.
- `AUDIENCIA`: es el acto procesal donde se escuchan las partes o se desahogan actuaciones.
- `ACTA_AUDIENCIA`: es el acta que deja constancia de lo ocurrido en la audiencia.
- `INSPECCION_JUDICIAL`: es la inspeccion ordenada dentro del expediente para revisar personas, bienes o lugares.
- `EXHORTO`: es la comunicacion entre organos jurisdiccionales para practicar una diligencia.
- `OFICIO_JUDICIAL`: es el oficio emitido por el juzgado para comunicar o requerir algo.
- `CONSTANCIA_ACTUARIAL`: es la constancia expedida por el actuario sobre una actuacion concreta.
- `RAZON_DE_NOTIFICACION`: es el asiento que explica como, cuando y a quien se notifico.
- `OTRA_ACTUACION`: es cualquier otra actuacion procesal que no encaje en las anteriores.

### `PRUEBA` - Medio de prueba

Documentos o soportes que se usan para demostrar un hecho dentro de un caso. Aqui algunos nombres pueden parecerse a otras familias, pero se usan cuando su funcion principal es probar algo.

- `DOCUMENTAL_PUBLICA`: es un documento emitido por una autoridad o fedatario con valor oficial.
- `DOCUMENTAL_PRIVADA`: es un documento firmado por particulares sin caracter de publico.
- `ACTA_NOTARIAL`: es el instrumento notarial que hace constar hechos o circunstancias.
- `PERICIAL`: es la prueba tecnica o cientifica aportada por un perito.
- `DICTAMEN_PERICIAL`: es el informe escrito del perito.
- `TESTIMONIAL`: es la declaracion de testigos.
- `CONFESIONAL`: es la declaracion de una parte sobre hechos propios o ajenos.
- `INSPECCION_JUDICIAL`: es la prueba basada en la observacion directa de una persona, cosa o lugar.
- `FOTOGRAFIA`: son imagenes fotograficas ofrecidas como evidencia.
- `VIDEOGRABACION`: es un archivo de video ofrecido como prueba.
- `EVIDENCIA_DIGITAL`: es un archivo digital, bitacora o dato electronico con valor probatorio.
- `CORREO_ELECTRONICO`: son mensajes de correo electronico ofrecidos como evidencia.
- `MENSAJERIA_INSTANTANEA`: son conversaciones de chat o mensajeria instantanea.
- `CAPTURA_PANTALLA`: es una imagen de pantalla que acredita contenido o interaccion.
- `ESTADO_DE_CUENTA`: es un estado de cuenta bancario o financiero usado para mostrar movimientos.
- `PRESUNCIONAL`: es la prueba que se basa en presunciones legales o en lo que se puede deducir logicamente.
- `INSTRUMENTAL_DE_ACTUACIONES`: es la prueba que se apoya en todo lo que ya consta en el expediente.
- `OTRA_PRUEBA`: es cualquier medio de prueba que no encaje en los anteriores.

### `CONTRATO_CONVENIO` - Contrato o convenio

Acuerdos entre personas, empresas o instituciones para crear, cambiar, trasladar o terminar obligaciones. Aqui entran contratos formales y tambien convenios para resolver problemas.

- `COMPRAVENTA`: es el contrato por el que alguien vende algo y otra persona lo compra.
- `ARRENDAMIENTO`: es el contrato de renta o alquiler de un bien.
- `PRESTACION_SERVICIOS`: es el contrato para prestar servicios profesionales o especializados.
- `CONFIDENCIALIDAD`: es el acuerdo para mantener informacion en reserva.
- `TRANSACCION`: es el acuerdo para prevenir o terminar una controversia.
- `RECONOCIMIENTO_ADEUDO`: es el documento donde alguien reconoce que debe dinero.
- `CESION_DERECHOS`: es el contrato para transferir derechos a otra persona.
- `MANDATO`: es el contrato por el que una persona actua por cuenta de otra.
- `FIDEICOMISO`: es el acuerdo por el que un bien se entrega a una institucion para un fin especifico.
- `PRENDA`: es una garantia sobre un bien mueble para asegurar una deuda.
- `HIPOTECA`: es una garantia sobre un inmueble para asegurar una deuda.
- `COMODATO`: es el prestamo gratuito de uso de un bien.
- `DONACION`: es la entrega gratuita de un bien a otra persona.
- `SUMINISTRO`: es el contrato para entregar bienes o servicios de forma periodica.
- `CONVENIO_JUDICIAL`: es el convenio que se presenta en juicio para que lo apruebe el tribunal.
- `CONVENIO_EXTRAJUDICIAL`: es el convenio celebrado fuera del juicio para arreglar una controversia.
- `OTRO_CONTRATO`: es cualquier otro contrato o convenio que no encaje en los anteriores.

### `NOTARIAL_REGISTRAL` - Notarial y registral

Documentos formalizados por notario o inscritos/relacionados con registros publicos. Su valor esta en que dan forma oficial a un acto o dejan constancia legal de el.

- `ESCRITURA_PUBLICA`: es el documento notarial principal firmado ante notario.
- `POLIZA_MERCANTIL`: es un instrumento notarial usado en actos mercantiles.
- `ACTA_CONSTITUTIVA`: es el documento que crea formalmente una sociedad o entidad.
- `REFORMA_ESTATUTARIA`: es la modificacion de los estatutos sociales.
- `PODER_NOTARIAL`: es el poder otorgado ante notario para representar a alguien.
- `REVOCACION_PODER`: es el documento que deja sin efectos un poder otorgado.
- `RATIFICACION_FIRMAS`: es el acto notarial para confirmar que una firma es autentica.
- `PROTOCOLIZACION`: es la incorporacion de un documento al protocolo notarial.
- `CERTIFICACION_NOTARIAL`: es la certificacion emitida por un notario sobre un documento o hecho.
- `FE_DE_HECHOS`: es el instrumento con el que el notario da fe de hechos observados.
- `TESTIMONIO_NOTARIAL`: es la copia certificada de un instrumento notarial.
- `APOSTILLA`: es la certificacion que permite usar un documento en otro pais.
- `INSCRIPCION_REGISTRAL`: es el asiento realizado en un registro publico.
- `BOLETA_REGISTRAL`: es la constancia de entrada, tramite o inscripcion registral.
- `CERTIFICADO_LIBERTAD_GRAVAMEN`: es el documento que muestra si un inmueble tiene o no cargas.
- `FOLIO_MERCANTIL`: es el documento o constancia ligada al folio del registro mercantil.
- `AVISO_PREVENTIVO`: es el aviso registral previo a una inscripcion o acto notarial.
- `OTRO_NOTARIAL`: es cualquier otro documento notarial o registral que no encaje en los anteriores.

### `ADMINISTRATIVO_AUTORIDAD` - Administrativo / autoridad

Documentos emitidos por autoridades administrativas fuera del juzgado. Aqui entran oficios, avisos, requerimientos, sanciones y respuestas dentro de tramites administrativos.

- `OFICIO`: es la comunicacion formal emitida por una autoridad administrativa.
- `REQUERIMIENTO_ADMINISTRATIVO`: es la solicitud u orden para entregar informacion o cumplir una obligacion.
- `RESPUESTA_REQUERIMIENTO`: es la respuesta para atender un requerimiento administrativo.
- `RESOLUCION_ADMINISTRATIVA`: es la decision emitida por una autoridad administrativa.
- `ACTA_INSPECCION`: es el acta levantada durante una visita o inspeccion de autoridad.
- `ACTA_CIRCUNSTANCIADA`: es el acta que deja constancia detallada de hechos o incidencias.
- `CITATORIO`: es la citacion para que una persona comparezca ante la autoridad.
- `NOTIFICACION_ADMINISTRATIVA`: es la notificacion hecha dentro de un procedimiento administrativo.
- `MULTA_SANCION`: es la resolucion o documento que impone una sancion administrativa.
- `PERMISO_LICENCIA`: es la autorizacion administrativa para realizar una actividad.
- `CONSTANCIA`: es el documento que acredita un hecho, tramite o situacion administrativa.
- `ACUERDO_ADMINISTRATIVO`: es la determinacion de tramite o de fondo emitida por una autoridad administrativa.
- `SUSPENSION_ADMINISTRATIVA`: es la decision que suspende efectos, actividades o tramites.
- `INFORME_CUMPLIMIENTO`: es el informe que acredita que se cumplio con lo pedido por la autoridad.
- `SOLICITUD_TRAMITE`: es la peticion para iniciar, continuar o resolver un tramite.
- `RECURSO_ADMINISTRATIVO`: es la impugnacion presentada contra un acto de autoridad administrativa.
- `BOLETA_INFRACCION`: es el documento que impone o inicia una infraccion administrativa.
- `ORDEN_VERIFICACION`: es el documento que autoriza una visita o verificacion administrativa.
- `OTRO_ADMINISTRATIVO`: es cualquier otro documento administrativo que no encaje en los anteriores.

### `FISCAL_CONTABLE` - Fiscal y contable

Documentos de impuestos, contabilidad y soporte financiero. Aqui el foco no es el juicio, sino el cumplimiento fiscal, los comprobantes y los registros contables.

- `FACTURA_CFDI`: es la factura electronica fiscal.
- `COMPLEMENTO_PAGO`: es el comprobante fiscal ligado a un pago recibido.
- `CONSTANCIA_SITUACION_FISCAL`: es el documento con los datos fiscales de una persona o empresa.
- `OPINION_CUMPLIMIENTO`: es la constancia que muestra si se esta al corriente con obligaciones fiscales o de seguridad social.
- `DECLARACION_FISCAL`: es la declaracion presentada ante la autoridad tributaria.
- `ACUSE_RECEPCION`: es el acuse emitido por la autoridad o la plataforma al recibir un tramite.
- `REQUERIMIENTO_SAT`: es el requerimiento emitido por la autoridad fiscal.
- `CONTESTACION_SAT`: es la respuesta para atender un requerimiento fiscal.
- `ESTADO_DE_CUENTA`: es el estado financiero o bancario usado como soporte contable.
- `RETENCION`: es el documento relacionado con retenciones fiscales o de pagos.
- `CARTA_PORTE`: es el documento relacionado con el traslado de bienes.
- `DETERMINACION_CREDITO_FISCAL`: es el documento con el que la autoridad determina un adeudo o contribucion.
- `RECURSO_REVOCACION_FISCAL`: es la impugnacion fiscal contra un acto de autoridad.
- `PAGO_PROVISIONAL`: es la constancia o acuse de un pago provisional de contribuciones.
- `BALANZA_CONTABLE`: es el documento contable con saldos y movimientos.
- `POLIZA_CONTABLE`: es el registro contable interno de una operacion.
- `OTRO_FISCAL`: es cualquier otro documento fiscal o contable que no encaje en los anteriores.

### `LABORAL_SEGURIDAD_SOCIAL` - Laboral y seguridad social

Documentos relacionados con la relacion de trabajo, la conciliacion laboral y la seguridad social.

- `CONTRATO_INDIVIDUAL_TRABAJO`: es el contrato entre patron y trabajador.
- `CONVENIO_TERMINACION`: es el acuerdo para dar por terminada la relacion laboral.
- `RENUNCIA`: es el escrito por el que la persona trabajadora termina la relacion por su voluntad.
- `FINIQUITO`: es el documento con el que se liquidan prestaciones al terminar la relacion.
- `LIQUIDACION`: es el documento de pago por terminacion laboral o indemnizacion.
- `RECIBO_NOMINA`: es el comprobante del pago de salario o percepciones.
- `ACTA_ADMINISTRATIVA_LABORAL`: es el acta interna por incidencias, faltas o conductas laborales.
- `DEMANDA_LABORAL`: es el escrito inicial en materia laboral.
- `CONTESTACION_LABORAL`: es la respuesta a una demanda o promocion laboral.
- `CITATORIO_CONCILIACION`: es la citacion para comparecer ante el centro de conciliacion.
- `CONSTANCIA_NO_CONCILIACION`: es la constancia que acredita que no fue posible conciliar.
- `CONVENIO_CONCILIACION`: es el convenio celebrado dentro del procedimiento conciliatorio.
- `ALTA_IMSS`: es el aviso o constancia de alta ante el IMSS.
- `BAJA_IMSS`: es el aviso o constancia de baja ante el IMSS.
- `AVISO_RIESGO_TRABAJO`: es el aviso relacionado con un accidente o enfermedad de trabajo.
- `OTRO_LABORAL`: es cualquier otro documento laboral o de seguridad social que no encaje en los anteriores.

### `CORPORATIVO_MERCANTIL` - Corporativo y mercantil

Documentos internos de sociedades y empresas. Aqui entran decisiones de socios, nombramientos, poderes y movimientos societarios.

- `ACTA_ASAMBLEA_ORDINARIA`: es el acta de una asamblea ordinaria de socios o accionistas.
- `ACTA_ASAMBLEA_EXTRAORDINARIA`: es el acta de una asamblea extraordinaria de socios o accionistas.
- `SESION_CONSEJO`: es el acta o minuta del consejo de administracion o su equivalente.
- `PODER_CORPORATIVO`: es el poder otorgado por una persona moral.
- `NOMBRAMIENTO_ADMINISTRADOR`: es el documento de designacion de administrador, gerente o representante.
- `REFORMA_ESTATUTOS`: es la modificacion de los estatutos sociales.
- `LIBRO_ACTAS`: es el registro o reproduccion del libro corporativo de actas.
- `TITULO_ACCIONARIO`: es el documento que representa acciones o partes sociales.
- `CESION_ACCIONES`: es el documento de transmision de acciones o partes sociales.
- `CONVENIO_SOCIOS`: es el acuerdo entre socios o accionistas sobre gobierno o inversion.
- `INFORME_CORPORATIVO`: es un informe interno, de asamblea o de situacion corporativa.
- `OTRO_CORPORATIVO`: es cualquier otro documento societario o mercantil que no encaje en los anteriores.

### `IDENTIFICACION_PERSONAL` - Identificacion y soporte personal

Documentos que identifican a una persona o acreditan datos basicos de identidad, domicilio o situacion personal.

- `IDENTIFICACION_OFICIAL`: es el documento oficial de identidad de una persona.
- `CURP`: es la Clave Unica de Registro de Poblacion.
- `RFC`: es el Registro Federal de Contribuyentes.
- `COMPROBANTE_DOMICILIO`: es el documento para acreditar el domicilio de una persona.
- `ACTA_NACIMIENTO`: es el acta del registro civil que acredita el nacimiento.
- `ACTA_MATRIMONIO`: es el acta del registro civil que acredita el matrimonio.
- `ACTA_DEFUNCION`: es el acta del registro civil que acredita el fallecimiento.
- `PASAPORTE`: es el documento de identidad y viaje expedido por autoridad competente.
- `LICENCIA_CONDUCIR`: es el documento que acredita autorizacion para conducir.
- `CEDULA_PROFESIONAL`: es el documento que acredita el ejercicio profesional.
- `CARTILLA_MILITAR`: es el documento militar de identificacion o liberacion.
- `NUMERO_SEGURIDAD_SOCIAL`: es la constancia o documento relacionado con el NSS.
- `VISA`: es el documento migratorio para ingreso o estancia en otro pais.
- `OTRO_PERSONAL`: es cualquier otro documento de soporte personal que no encaje en los anteriores.

### `OTRO` - Otro

Categoria de respaldo para documentos que no encajan en ninguna de las familias anteriores.

- `NO_CLASIFICADO`: es el documento que no encaja en ninguna categoria o subtipo previo.

## Ejemplos rapidos

- Una demanda para empezar un juicio: `ESCRITO_PROCESAL` / `DEMANDA_INICIAL`.
- Un auto del juez que admite la demanda: `RESOLUCION_JUDICIAL` / `AUTO_ADMISION`.
- Una notificacion por estrados del juzgado: `ACTUACION_PROCESAL` / `NOTIFICACION_POR_ESTRADOS`.
- Una fotografia ofrecida para demostrar un hecho: `PRUEBA` / `FOTOGRAFIA`.
- Un contrato de renta: `CONTRATO_CONVENIO` / `ARRENDAMIENTO`.
- Un acta de hechos levantada por notario: `NOTARIAL_REGISTRAL` / `FE_DE_HECHOS`.
- Un oficio del municipio pidiendo informacion: `ADMINISTRATIVO_AUTORIDAD` / `OFICIO`.
- Una factura electronica: `FISCAL_CONTABLE` / `FACTURA_CFDI`.
- Un citatorio para el centro de conciliacion: `LABORAL_SEGURIDAD_SOCIAL` / `CITATORIO_CONCILIACION`.
- Un acta de asamblea de socios: `CORPORATIVO_MERCANTIL` / `ACTA_ASAMBLEA_ORDINARIA` o `ACTA_ASAMBLEA_EXTRAORDINARIA`.

## Nota Importante

Si algun termino no coincide con lo que expresa o hay un nombre mas coloquial se puede cambiar.