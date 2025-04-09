import type { CampoPetrolero, DatosAutocompletados } from "@/types";

// Datos de ejemplo para los campos petroleros
export const camposPetroleros: CampoPetrolero[] = [
  {
    "value": "ABANICO",
    "label": "ABANICO"
  },
  {
    "value": "ABARCO",
    "label": "ABARCO"
  },
  {
    "value": "ABEJAS",
    "label": "ABEJAS"
  },
  {
    "value": "ACAE SAN MIGUEL",
    "label": "ACAE SAN MIGUEL"
  },
  {
    "value": "ACORDIONERO",
    "label": "ACORDIONERO"
  },
  {
    "value": "ADALIA",
    "label": "ADALIA"
  },
  {
    "value": "AGUAS BLANCAS",
    "label": "AGUAS BLANCAS"
  },
  {
    "value": "AKACIAS",
    "label": "AKACIAS"
  },
  {
    "value": "AKIRA",
    "label": "AKIRA"
  },
  {
    "value": "ALBERTA",
    "label": "ALBERTA"
  },
  {
    "value": "ALEPE",
    "label": "ALEPE"
  },
  {
    "value": "ALQAMARI",
    "label": "ALQAMARI"
  },
  {
    "value": "ALVA SUR",
    "label": "ALVA SUR"
  },
  {
    "value": "AMBROSÍA",
    "label": "AMBROSÍA"
  },
  {
    "value": "ANDALUZ",
    "label": "ANDALUZ"
  },
  {
    "value": "ANDINA",
    "label": "ANDINA"
  },
  {
    "value": "APIAY",
    "label": "APIAY"
  },
  {
    "value": "APIAY ESTE",
    "label": "APIAY ESTE"
  },
  {
    "value": "ARAGUATO",
    "label": "ARAGUATO"
  },
  {
    "value": "ARAUCA",
    "label": "ARAUCA"
  },
  {
    "value": "AREA TECA-COCORNA",
    "label": "AREA TECA-COCORNA"
  },
  {
    "value": "ARRAYÁN",
    "label": "ARRAYÁN"
  },
  {
    "value": "ARRECIFE",
    "label": "ARRECIFE"
  },
  {
    "value": "AULLADOR",
    "label": "AULLADOR"
  },
  {
    "value": "AUSTRAL",
    "label": "AUSTRAL"
  },
  {
    "value": "AZAFRÁN",
    "label": "AZAFRÁN"
  },
  {
    "value": "AZOGUE",
    "label": "AZOGUE"
  },
  {
    "value": "BACANO",
    "label": "BACANO"
  },
  {
    "value": "BALCÓN",
    "label": "BALCÓN"
  },
  {
    "value": "BARQUEREÑA",
    "label": "BARQUEREÑA"
  },
  {
    "value": "BASTIDAS",
    "label": "BASTIDAS"
  },
  {
    "value": "BAYONERO",
    "label": "BAYONERO"
  },
  {
    "value": "BEGONIA",
    "label": "BEGONIA"
  },
  {
    "value": "BOLÍVAR",
    "label": "BOLÍVAR"
  },
  {
    "value": "BONANZA",
    "label": "BONANZA"
  },
  {
    "value": "BONGA",
    "label": "BONGA"
  },
  {
    "value": "BORAL",
    "label": "BORAL"
  },
  {
    "value": "BORANDA",
    "label": "BORANDA"
  },
  {
    "value": "BRISAS",
    "label": "BRISAS"
  },
  {
    "value": "BULLERENGUE",
    "label": "BULLERENGUE"
  },
  {
    "value": "CABIONA",
    "label": "CABIONA"
  },
  {
    "value": "CAIPAL",
    "label": "CAIPAL"
  },
  {
    "value": "CAJUA",
    "label": "CAJUA"
  },
  {
    "value": "CALONA",
    "label": "CALONA"
  },
  {
    "value": "CANACABARE",
    "label": "CANACABARE"
  },
  {
    "value": "Canaguay",
    "label": "Canaguay"
  },
  {
    "value": "CANAGUEY",
    "label": "CANAGUEY"
  },
  {
    "value": "CANDALAY",
    "label": "CANDALAY"
  },
  {
    "value": "CANDELILLA",
    "label": "CANDELILLA"
  },
  {
    "value": "CAÑO GANDUL",
    "label": "CAÑO GANDUL"
  },
  {
    "value": "CAÑO GARZA",
    "label": "CAÑO GARZA"
  },
  {
    "value": "CAÑO GARZA ESTE",
    "label": "CAÑO GARZA ESTE"
  },
  {
    "value": "CAÑO GARZA NORTE ",
    "label": "CAÑO GARZA NORTE "
  },
  {
    "value": "CAÑO LIMÓN",
    "label": "CAÑO LIMÓN"
  },
  {
    "value": "CAÑO RONDÓN",
    "label": "CAÑO RONDÓN"
  },
  {
    "value": "CAÑO SUR ESTE",
    "label": "CAÑO SUR ESTE"
  },
  {
    "value": "CAÑO YARUMAL",
    "label": "CAÑO YARUMAL"
  },
  {
    "value": "CAPACHOS",
    "label": "CAPACHOS"
  },
  {
    "value": "CAPACHOS SUR",
    "label": "CAPACHOS SUR"
  },
  {
    "value": "CARACARA SUR A",
    "label": "CARACARA SUR A"
  },
  {
    "value": "CARACARA SUR B Y C",
    "label": "CARACARA SUR B Y C"
  },
  {
    "value": "CARETO",
    "label": "CARETO"
  },
  {
    "value": "CARIBE",
    "label": "CARIBE"
  },
  {
    "value": "CARICARE",
    "label": "CARICARE"
  },
  {
    "value": "CARMENTEA",
    "label": "CARMENTEA"
  },
  {
    "value": "CARRIZALES",
    "label": "CARRIZALES"
  },
  {
    "value": "CARRIZALES NORTE",
    "label": "CARRIZALES NORTE"
  },
  {
    "value": "CARUPANA",
    "label": "CARUPANA"
  },
  {
    "value": "CASABE",
    "label": "CASABE"
  },
  {
    "value": "CASABE SUR",
    "label": "CASABE SUR"
  },
  {
    "value": "CASTILLA ",
    "label": "CASTILLA "
  },
  {
    "value": "CASTILLA NORTE",
    "label": "CASTILLA NORTE"
  },
  {
    "value": "CEIBO",
    "label": "CEIBO"
  },
  {
    "value": "CERNÍCALO",
    "label": "CERNÍCALO"
  },
  {
    "value": "CHAPARRITO",
    "label": "CHAPARRITO"
  },
  {
    "value": "CHENCHE",
    "label": "CHENCHE"
  },
  {
    "value": "CHICHIMENE",
    "label": "CHICHIMENE"
  },
  {
    "value": "CHICHIMENE SW",
    "label": "CHICHIMENE SW"
  },
  {
    "value": "CHIPIRÓN",
    "label": "CHIPIRÓN"
  },
  {
    "value": "CHIRICOCA",
    "label": "CHIRICOCA"
  },
  {
    "value": "CHUIRA",
    "label": "CHUIRA"
  },
  {
    "value": "CHURUYACO",
    "label": "CHURUYACO"
  },
  {
    "value": "CICUCO",
    "label": "CICUCO"
  },
  {
    "value": "CIRIGÜELO",
    "label": "CIRIGÜELO"
  },
  {
    "value": "COBRA",
    "label": "COBRA"
  },
  {
    "value": "COHEMBI",
    "label": "COHEMBI"
  },
  {
    "value": "COLÓN",
    "label": "COLÓN"
  },
  {
    "value": "COPA UNIFICADO",
    "label": "COPA UNIFICADO"
  },
  {
    "value": "CORAZÓN",
    "label": "CORAZÓN"
  },
  {
    "value": "CORAZÓN WEST",
    "label": "CORAZÓN WEST"
  },
  {
    "value": "CORCEL A",
    "label": "CORCEL A"
  },
  {
    "value": "CORCEL C",
    "label": "CORCEL C"
  },
  {
    "value": "CORCEL D",
    "label": "CORCEL D"
  },
  {
    "value": "COREN",
    "label": "COREN"
  },
  {
    "value": "COROCORA",
    "label": "COROCORA"
  },
  {
    "value": "CORRALES",
    "label": "CORRALES"
  },
  {
    "value": "CORSUR",
    "label": "CORSUR"
  },
  {
    "value": "COSECHA-A",
    "label": "COSECHA-A"
  },
  {
    "value": "COSTAYACO",
    "label": "COSTAYACO"
  },
  {
    "value": "CRAVO ESTE",
    "label": "CRAVO ESTE"
  },
  {
    "value": "CRISTALINA",
    "label": "CRISTALINA"
  },
  {
    "value": "CUERVA NORESTE",
    "label": "CUERVA NORESTE"
  },
  {
    "value": "CUERVA OESTE",
    "label": "CUERVA OESTE"
  },
  {
    "value": "CUERVA SUR",
    "label": "CUERVA SUR"
  },
  {
    "value": "CUMPLIDOR",
    "label": "CUMPLIDOR"
  },
  {
    "value": "CUPIAGUA",
    "label": "CUPIAGUA"
  },
  {
    "value": "CUPIAGUA LIRIA",
    "label": "CUPIAGUA LIRIA"
  },
  {
    "value": "CUPIAGUA SUR",
    "label": "CUPIAGUA SUR"
  },
  {
    "value": "CURITO",
    "label": "CURITO"
  },
  {
    "value": "CUSIANA",
    "label": "CUSIANA"
  },
  {
    "value": "CUSIANA NORTE",
    "label": "CUSIANA NORTE"
  },
  {
    "value": "DANES",
    "label": "DANES"
  },
  {
    "value": "DINA CRETÁCEOS",
    "label": "DINA CRETÁCEOS"
  },
  {
    "value": "DINA NORTE",
    "label": "DINA NORTE"
  },
  {
    "value": "DINA TERCIARIOS",
    "label": "DINA TERCIARIOS"
  },
  {
    "value": "DOROTEA B",
    "label": "DOROTEA B"
  },
  {
    "value": "DOROTEA E",
    "label": "DOROTEA E"
  },
  {
    "value": "EL DIFÍCIL",
    "label": "EL DIFÍCIL"
  },
  {
    "value": "EL NIÑO",
    "label": "EL NIÑO"
  },
  {
    "value": "ELIZITA",
    "label": "ELIZITA"
  },
  {
    "value": "ESPIGUERO",
    "label": "ESPIGUERO"
  },
  {
    "value": "ESTERO",
    "label": "ESTERO"
  },
  {
    "value": "FINN",
    "label": "FINN"
  },
  {
    "value": "FLAMENCOS",
    "label": "FLAMENCOS"
  },
  {
    "value": "FLOREÑA",
    "label": "FLOREÑA"
  },
  {
    "value": "FLOREÑA MIRADOR",
    "label": "FLOREÑA MIRADOR"
  },
  {
    "value": "FRANKMAVE",
    "label": "FRANKMAVE"
  },
  {
    "value": "GALEMBO",
    "label": "GALEMBO"
  },
  {
    "value": "GARZAS",
    "label": "GARZAS"
  },
  {
    "value": "GAVAN",
    "label": "GAVAN"
  },
  {
    "value": "GIBRALTAR",
    "label": "GIBRALTAR"
  },
  {
    "value": "GIGANTE",
    "label": "GIGANTE"
  },
  {
    "value": "GIRASOL",
    "label": "GIRASOL"
  },
  {
    "value": "GRETA OTO",
    "label": "GRETA OTO"
  },
  {
    "value": "GUACHARACA",
    "label": "GUACHARACA"
  },
  {
    "value": "GUACO",
    "label": "GUACO"
  },
  {
    "value": "GUANAPALO",
    "label": "GUANAPALO"
  },
  {
    "value": "GUANDO",
    "label": "GUANDO"
  },
  {
    "value": "GUANDO SW",
    "label": "GUANDO SW"
  },
  {
    "value": "GUARILAQUE",
    "label": "GUARILAQUE"
  },
  {
    "value": "GUARROJO",
    "label": "GUARROJO"
  },
  {
    "value": "GUASAR",
    "label": "GUASAR"
  },
  {
    "value": "GUATIQUIA",
    "label": "GUATIQUIA"
  },
  {
    "value": "GUAYUYACO",
    "label": "GUAYUYACO"
  },
  {
    "value": "HALCÓN",
    "label": "HALCÓN"
  },
  {
    "value": "HAMACA",
    "label": "HAMACA"
  },
  {
    "value": "HOATZIN",
    "label": "HOATZIN"
  },
  {
    "value": "HOATZIN NORTE",
    "label": "HOATZIN NORTE"
  },
  {
    "value": "HORMIGA",
    "label": "HORMIGA"
  },
  {
    "value": "IBAMACA",
    "label": "IBAMACA"
  },
  {
    "value": "INDICO",
    "label": "INDICO"
  },
  {
    "value": "INFANTAS",
    "label": "INFANTAS"
  },
  {
    "value": "ISTANBUL",
    "label": "ISTANBUL"
  },
  {
    "value": "JACAMAR",
    "label": "JACAMAR"
  },
  {
    "value": "JACANA",
    "label": "JACANA"
  },
  {
    "value": "JAZMIN",
    "label": "JAZMIN"
  },
  {
    "value": "JIBA UNIFICADO",
    "label": "JIBA UNIFICADO"
  },
  {
    "value": "JORCAN",
    "label": "JORCAN"
  },
  {
    "value": "JORDÁN",
    "label": "JORDÁN"
  },
  {
    "value": "JUANAMBU",
    "label": "JUANAMBU"
  },
  {
    "value": "KANANASKIS",
    "label": "KANANASKIS"
  },
  {
    "value": "KIMBO",
    "label": "KIMBO"
  },
  {
    "value": "KITARO",
    "label": "KITARO"
  },
  {
    "value": "LA BELLEZA",
    "label": "LA BELLEZA"
  },
  {
    "value": "LA CAÑADA NORTE",
    "label": "LA CAÑADA NORTE"
  },
  {
    "value": "La Cañada Norte PUE",
    "label": "La Cañada Norte PUE"
  },
  {
    "value": "LA CIRA",
    "label": "LA CIRA"
  },
  {
    "value": "LA FLORA",
    "label": "LA FLORA"
  },
  {
    "value": "LA GLORIA",
    "label": "LA GLORIA"
  },
  {
    "value": "LA HOCHA",
    "label": "LA HOCHA"
  },
  {
    "value": "La Hocha - PUE",
    "label": "La Hocha - PUE"
  },
  {
    "value": "LA JAGUA",
    "label": "LA JAGUA"
  },
  {
    "value": "LA PUNTA",
    "label": "LA PUNTA"
  },
  {
    "value": "LA URRACA",
    "label": "LA URRACA"
  },
  {
    "value": "LABRADOR",
    "label": "LABRADOR"
  },
  {
    "value": "LAS MARACAS ",
    "label": "LAS MARACAS "
  },
  {
    "value": "LEONO",
    "label": "LEONO"
  },
  {
    "value": "LIBERTAD",
    "label": "LIBERTAD"
  },
  {
    "value": "LIBERTAD NORTE",
    "label": "LIBERTAD NORTE"
  },
  {
    "value": "LILIA-ANGIE UNIFICADO",
    "label": "LILIA-ANGIE UNIFICADO"
  },
  {
    "value": "LISAMA",
    "label": "LISAMA"
  },
  {
    "value": "LLANITO UNIFICADO",
    "label": "LLANITO UNIFICADO"
  },
  {
    "value": "LLANOS-58-4",
    "label": "LLANOS-58-4"
  },
  {
    "value": "LOMA LARGA",
    "label": "LOMA LARGA"
  },
  {
    "value": "Lorito",
    "label": "Lorito"
  },
  {
    "value": "LORO",
    "label": "LORO"
  },
  {
    "value": "LOS ACEITES",
    "label": "LOS ACEITES"
  },
  {
    "value": "LOS ANGELES",
    "label": "LOS ANGELES"
  },
  {
    "value": "LOS HATOS",
    "label": "LOS HATOS"
  },
  {
    "value": "LOS POTROS",
    "label": "LOS POTROS"
  },
  {
    "value": "MACANA",
    "label": "MACANA"
  },
  {
    "value": "MAMEY",
    "label": "MAMEY"
  },
  {
    "value": "MANÁ",
    "label": "MANÁ"
  },
  {
    "value": "MANSOYA",
    "label": "MANSOYA"
  },
  {
    "value": "MANTIS",
    "label": "MANTIS"
  },
  {
    "value": "MARY",
    "label": "MARY"
  },
  {
    "value": "MATACHÍN NORTE",
    "label": "MATACHÍN NORTE"
  },
  {
    "value": "MATACHÍN SUR",
    "label": "MATACHÍN SUR"
  },
  {
    "value": "MATEMARRANO",
    "label": "MATEMARRANO"
  },
  {
    "value": "MAURITÍA ESTE",
    "label": "MAURITÍA ESTE"
  },
  {
    "value": "MAURITÍA NORTE",
    "label": "MAURITÍA NORTE"
  },
  {
    "value": "MAUTE",
    "label": "MAUTE"
  },
  {
    "value": "MAX ",
    "label": "MAX "
  },
  {
    "value": "MIRTO - AGAPANTO UNIFICADO",
    "label": "MIRTO - AGAPANTO UNIFICADO"
  },
  {
    "value": "MONO ARAÑA",
    "label": "MONO ARAÑA"
  },
  {
    "value": "MOQUETA",
    "label": "MOQUETA"
  },
  {
    "value": "MORICHE",
    "label": "MORICHE"
  },
  {
    "value": "MORROCOY",
    "label": "MORROCOY"
  },
  {
    "value": "NANCY",
    "label": "NANCY"
  },
  {
    "value": "NARE SUR",
    "label": "NARE SUR"
  },
  {
    "value": "NASHIRA NORTE",
    "label": "NASHIRA NORTE"
  },
  {
    "value": "NUTRIA",
    "label": "NUTRIA"
  },
  {
    "value": "OCELOTE",
    "label": "OCELOTE"
  },
  {
    "value": "OJO DE TIGRE",
    "label": "OJO DE TIGRE"
  },
  {
    "value": "OMI",
    "label": "OMI"
  },
  {
    "value": "OPÓN",
    "label": "OPÓN"
  },
  {
    "value": "ORITO",
    "label": "ORITO"
  },
  {
    "value": "OROPÉNDOLA",
    "label": "OROPÉNDOLA"
  },
  {
    "value": "ORTEGA",
    "label": "ORTEGA"
  },
  {
    "value": "OSO PARDO",
    "label": "OSO PARDO"
  },
  {
    "value": "PACANDE",
    "label": "PACANDE"
  },
  {
    "value": "PACHAQUIARO",
    "label": "PACHAQUIARO"
  },
  {
    "value": "PALAGUA",
    "label": "PALAGUA"
  },
  {
    "value": "PALERMO - SANTA CLARA UNIFICADO",
    "label": "PALERMO - SANTA CLARA UNIFICADO"
  },
  {
    "value": "PALMARITO",
    "label": "PALMARITO"
  },
  {
    "value": "PANTRO",
    "label": "PANTRO"
  },
  {
    "value": "PARAVARE",
    "label": "PARAVARE"
  },
  {
    "value": "PAUTO SUR",
    "label": "PAUTO SUR"
  },
  {
    "value": "PAUTO SUR RECETOR",
    "label": "PAUTO SUR RECETOR"
  },
  {
    "value": "PAYOA",
    "label": "PAYOA"
  },
  {
    "value": "PAYOA WEST",
    "label": "PAYOA WEST"
  },
  {
    "value": "PEGUITA",
    "label": "PEGUITA"
  },
  {
    "value": "PEGUITA II",
    "label": "PEGUITA II"
  },
  {
    "value": "PEGUITA III",
    "label": "PEGUITA III"
  },
  {
    "value": "PEGUITA SW",
    "label": "PEGUITA SW"
  },
  {
    "value": "PENDARE ",
    "label": "PENDARE "
  },
  {
    "value": "Pendare Norte",
    "label": "Pendare Norte"
  },
  {
    "value": "PEÑAS BLANCAS",
    "label": "PEÑAS BLANCAS"
  },
  {
    "value": "PETIRROJO UNIFICADO",
    "label": "PETIRROJO UNIFICADO"
  },
  {
    "value": "PINTADO",
    "label": "PINTADO"
  },
  {
    "value": "PIRITO",
    "label": "PIRITO"
  },
  {
    "value": "PISINGO",
    "label": "PISINGO"
  },
  {
    "value": "PLATANILLO",
    "label": "PLATANILLO"
  },
  {
    "value": "POMPEYA",
    "label": "POMPEYA"
  },
  {
    "value": "PROVINCIA",
    "label": "PROVINCIA"
  },
  {
    "value": "Pumara",
    "label": "Pumara"
  },
  {
    "value": "QUIFA",
    "label": "QUIFA"
  },
  {
    "value": "QUILLACINGA",
    "label": "QUILLACINGA"
  },
  {
    "value": "QUINDE",
    "label": "QUINDE"
  },
  {
    "value": "QURIYANA",
    "label": "QURIYANA"
  },
  {
    "value": "RAMIRIQUI",
    "label": "RAMIRIQUI"
  },
  {
    "value": "RANCHO HERMOSO",
    "label": "RANCHO HERMOSO"
  },
  {
    "value": "RANCHO QUEMADO",
    "label": "RANCHO QUEMADO"
  },
  {
    "value": "RECETOR WEST",
    "label": "RECETOR WEST"
  },
  {
    "value": "REDONDO",
    "label": "REDONDO"
  },
  {
    "value": "REDONDO ESTE",
    "label": "REDONDO ESTE"
  },
  {
    "value": "REMACHE NORTE",
    "label": "REMACHE NORTE"
  },
  {
    "value": "REMACHE SUR",
    "label": "REMACHE SUR"
  },
  {
    "value": "REX",
    "label": "REX"
  },
  {
    "value": "REX NE",
    "label": "REX NE"
  },
  {
    "value": "RIO CRAVO ESTE",
    "label": "RIO CRAVO ESTE"
  },
  {
    "value": "RÍO OPIA",
    "label": "RÍO OPIA"
  },
  {
    "value": "RÍO SALDAÑA",
    "label": "RÍO SALDAÑA"
  },
  {
    "value": "RIO ZULIA",
    "label": "RIO ZULIA"
  },
  {
    "value": "RUBIALES",
    "label": "RUBIALES"
  },
  {
    "value": "RUMBA",
    "label": "RUMBA"
  },
  {
    "value": "SABANERO",
    "label": "SABANERO"
  },
  {
    "value": "SAIMIRÍ",
    "label": "SAIMIRÍ"
  },
  {
    "value": "SALINA",
    "label": "SALINA"
  },
  {
    "value": "SALTADOR",
    "label": "SALTADOR"
  },
  {
    "value": "SAN ANTONIO",
    "label": "SAN ANTONIO"
  },
  {
    "value": "SAN FRANCISCO",
    "label": "SAN FRANCISCO"
  },
  {
    "value": "SAN ROQUE",
    "label": "SAN ROQUE"
  },
  {
    "value": "SANTA LUCÍA",
    "label": "SANTA LUCÍA"
  },
  {
    "value": "SANTIAGO",
    "label": "SANTIAGO"
  },
  {
    "value": "SANTO DOMINGO UNIFICADO",
    "label": "SANTO DOMINGO UNIFICADO"
  },
  {
    "value": "SARDINAS",
    "label": "SARDINAS"
  },
  {
    "value": "SARDINATA",
    "label": "SARDINATA"
  },
  {
    "value": "SAURIO",
    "label": "SAURIO"
  },
  {
    "value": "SUCIO",
    "label": "SUCIO"
  },
  {
    "value": "SURIA",
    "label": "SURIA"
  },
  {
    "value": "SURIA SUR",
    "label": "SURIA SUR"
  },
  {
    "value": "TELLO",
    "label": "TELLO"
  },
  {
    "value": "TEMPRANILLO UNIFICADO",
    "label": "TEMPRANILLO UNIFICADO"
  },
  {
    "value": "TENAY",
    "label": "TENAY"
  },
  {
    "value": "TERECAY",
    "label": "TERECAY"
  },
  {
    "value": "TESORO",
    "label": "TESORO"
  },
  {
    "value": "TIBÚ",
    "label": "TIBÚ"
  },
  {
    "value": "TIGANA ",
    "label": "TIGANA "
  },
  {
    "value": "TILO",
    "label": "TILO"
  },
  {
    "value": "TILODIRÁN",
    "label": "TILODIRÁN"
  },
  {
    "value": "TINAMU",
    "label": "TINAMU"
  },
  {
    "value": "TISQUIRAMA",
    "label": "TISQUIRAMA"
  },
  {
    "value": "TOCARIA",
    "label": "TOCARIA"
  },
  {
    "value": "TOLDADO",
    "label": "TOLDADO"
  },
  {
    "value": "TOQUI TOQUI",
    "label": "TOQUI TOQUI"
  },
  {
    "value": "TORITOS",
    "label": "TORITOS"
  },
  {
    "value": "TORO SENTADO",
    "label": "TORO SENTADO"
  },
  {
    "value": "TORO SENTADO NORTE",
    "label": "TORO SENTADO NORTE"
  },
  {
    "value": "TORO SENTADO WEST",
    "label": "TORO SENTADO WEST"
  },
  {
    "value": "TOROYACO",
    "label": "TOROYACO"
  },
  {
    "value": "TOTARE",
    "label": "TOTARE"
  },
  {
    "value": "TUA",
    "label": "TUA"
  },
  {
    "value": "TULIPÁN",
    "label": "TULIPÁN"
  },
  {
    "value": "TURPIAL",
    "label": "TURPIAL"
  },
  {
    "value": "UNDERRIVER",
    "label": "UNDERRIVER"
  },
  {
    "value": "UNIFICADO PALOGRANDE",
    "label": "UNIFICADO PALOGRANDE"
  },
  {
    "value": "Unificado Río Ceibas",
    "label": "Unificado Río Ceibas"
  },
  {
    "value": "UNUMA",
    "label": "UNUMA"
  },
  {
    "value": "VALDIVIA - ALMAGRO",
    "label": "VALDIVIA - ALMAGRO"
  },
  {
    "value": "VELASQUEZ",
    "label": "VELASQUEZ"
  },
  {
    "value": "VENUS",
    "label": "VENUS"
  },
  {
    "value": "VIGIA",
    "label": "VIGIA"
  },
  {
    "value": "VIGIA SUR",
    "label": "VIGIA SUR"
  },
  {
    "value": "VIKINGO",
    "label": "VIKINGO"
  },
  {
    "value": "VIREO",
    "label": "VIREO"
  },
  {
    "value": "YAGUARA",
    "label": "YAGUARA"
  },
  {
    "value": "YAGUAZO",
    "label": "YAGUAZO"
  },
  {
    "value": "YAMÚ",
    "label": "YAMÚ"
  },
  {
    "value": "YARIGUÍ-CANTAGALLO",
    "label": "YARIGUÍ-CANTAGALLO"
  },
  {
    "value": "YATAY",
    "label": "YATAY"
  },
  {
    "value": "YENAC",
    "label": "YENAC"
  },
  {
    "value": "ZOE",
    "label": "ZOE"
  },
  {
    "value": "ZOPILOTE",
    "label": "ZOPILOTE"
  },
  {
    "value": "ZORZAL",
    "label": "ZORZAL"
  }
];

// Lista de campos para filtrar
export const camposList: CampoPetrolero[] = [
  { value: "todos", label: "Todos los campos" },
  ...camposPetroleros,
];

// Datos de ejemplo para autocompletar
export const datosAutocompletados: Record<string, DatosAutocompletados> = {
  ABANICO: {
    contrato: "ABANICO",
    municipio: "ESPINAL",
    departamento: "TOLIMA",
    operador: "ECOPETROL S.A.",
  },
  ABARCO: {
    contrato: "NARE",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  ABEJAS: {
    contrato: "ESTERO",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "ACAE SAN MIGUEL": {
    contrato: "AREA SUR",
    municipio: "SAN MIGUEL",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  ACORDIONERO: {
    contrato: "MIDAS",
    municipio: "SAN MARTÍN",
    departamento: "CESAR",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  ADALIA: {
    contrato: "LLA 30",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  "AGUAS BLANCAS": {
    contrato: "AGUAS BLANCAS",
    municipio: "SIMACOTA",
    departamento: "SANTANDER",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  AKACIAS: {
    contrato: "CPO 9",
    municipio: "GUAMAL",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  AKIRA: {
    contrato: "CABRESTERO",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  ALBERTA: {
    contrato: "TAPIR",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PETROLEOS COLOMBIANOS SA",
  },
  ALEPE: {
    contrato: "NASHIRA",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "OIRU CORPORATION",
  },
  ALQAMARI: {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  "ALVA SUR": {
    contrato: "NASHIRA",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "OIRU CORPORATION",
  },
  AMBROSÍA: {
    contrato: "AMBROSÍA",
    municipio: "PIEDRAS",
    departamento: "TOLIMA",
    operador: "INTEROIL COLOMBIA EXPLORATION AND PRODUCTION",
  },
  ANDALUZ: {
    contrato: "JAGUEYES 3432-B",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "TOC ENERGIA SUCURSAL COLOMBIA",
  },
  ANDINA: {
    contrato: "CAPACHOS",
    municipio: "TAME",
    departamento: "ARAUCA",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  APIAY: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "APIAY ESTE": {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  ARAGUATO: {
    contrato: "CHIPIRÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  ARAUCA: {
    contrato: "ARAUCA",
    municipio: "SARAVENA",
    departamento: "ARAUCA",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  "AREA TECA-COCORNA": {
    contrato: "TECA-COCORNA",
    municipio: "PUERTO TRIUNFO",
    departamento: "ANTIOQUIA",
    operador: "ECOPETROL S.A.",
  },
  ARRAYÁN: {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  ARRECIFE: {
    contrato: "VIM 8",
    municipio: "PUEBLO NUEVO",
    departamento: "CORDOBA",
    operador: "HOCOL S.A.",
  },
  AULLADOR: {
    contrato: "PLAYON",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  AUSTRAL: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  AZAFRÁN: {
    contrato: "GUACHIRIA SUR",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "MONTAJES JM S.A.",
  },
  AZOGUE: {
    contrato: "LLA 32",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  BACANO: {
    contrato: "CABRESTERO",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  BALCÓN: {
    contrato: "PALERMO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  BARQUEREÑA: {
    contrato: "CASANARE",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  BASTIDAS: {
    contrato: "CRAVOVIEJO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  BAYONERO: {
    contrato: "CHIPIRÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  BEGONIA: {
    contrato: "LLA 40",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  BOLÍVAR: {
    contrato: "BUENAVISTA",
    municipio: "TOPAGA",
    departamento: "BOYACA",
    operador: "UNION TEMPORAL OMEGA ENERGY",
  },
  BONANZA: {
    contrato: "PROVINCIA P NORTE",
    municipio: "RIONEGRO",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  BONGA: {
    contrato: "SAMAN",
    municipio: "OVEJAS",
    departamento: "SUCRE",
    operador: "HOCOL S.A.",
  },
  BORAL: {
    contrato: "RIO VERDE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  BORANDA: {
    contrato: "BORANDA",
    municipio: "RIONEGRO",
    departamento: "SANTANDER",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  BRISAS: {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  BULLERENGUE: {
    contrato: "SSJN-1",
    municipio: "SABANALARGA",
    departamento: "ATLANTICO",
    operador: "LEWIS ENERGY COLOMBIA INC",
  },
  CABIONA: {
    contrato: "CABIONA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "NEW GRANADA ENERGY CORPORATION SUCURSAL COLOMBIA",
  },
  CAIPAL: {
    contrato: "PALAGUA",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  CAJUA: {
    contrato: "QUIFA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CALONA: {
    contrato: "LLA 32",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  CANACABARE: {
    contrato: "ALCARAVÁN",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  Canaguay: {
    contrato: "CANAGUARO",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CANAGUEY: {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  CANDALAY: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  CANDELILLA: {
    contrato: "GUATIQUIA",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "CAÑO GANDUL": {
    contrato: "COROCORA",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "CAÑO GARZA": {
    contrato: "CASANARE",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "CAÑO GARZA ESTE": {
    contrato: "CASANARE",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "CAÑO GARZA NORTE ": {
    contrato: "CASANARE",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "CAÑO LIMÓN": {
    contrato: "CRAVO NORTE",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "CAÑO RONDÓN": {
    contrato: "RONDÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "CAÑO SUR ESTE": {
    contrato: "CAÑO SUR",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "CAÑO YARUMAL": {
    contrato: "CRAVO NORTE",
    municipio: "ARAUCA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  CAPACHOS: {
    contrato: "CAPACHOS",
    municipio: "TAME",
    departamento: "ARAUCA",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  "CAPACHOS SUR": {
    contrato: "CAPACHOS",
    municipio: "TAME",
    departamento: "ARAUCA",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  "CARACARA SUR A": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "CARACARA SUR B Y C": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  CARETO: {
    contrato: "CUBIRO",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CARIBE: {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  CARICARE: {
    contrato: "RONDÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  CARMENTEA: {
    contrato: "LLA 32",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  CARRIZALES: {
    contrato: "CRAVOVIEJO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "CARRIZALES NORTE": {
    contrato: "TAPIR",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PETROLEOS COLOMBIANOS SA",
  },
  CARUPANA: {
    contrato: "YAMU",
    municipio: "PORE",
    departamento: "CASANARE",
    operador: "PERENCO OIL AND GAS COLOMBIA LIMITED.",
  },
  CASABE: {
    contrato: "MAGDALENA MEDIO-CASABE",
    municipio: "YONDO",
    departamento: "ANTIOQUIA",
    operador: "ECOPETROL S.A.",
  },
  "CASABE SUR": {
    contrato: "MAGDALENA MEDIO-CASABE",
    municipio: "YONDO",
    departamento: "ANTIOQUIA",
    operador: "ECOPETROL S.A.",
  },
  "CASTILLA ": {
    contrato: "CUBARRAL",
    municipio: "CASTILLA NUEVA",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "CASTILLA NORTE": {
    contrato: "CUBARRAL",
    municipio: "CASTILLA NUEVA",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  CEIBO: {
    contrato: "GUATIQUIA",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CERNÍCALO: {
    contrato: "CUBIRO",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CHAPARRITO: {
    contrato: "ESTERO",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  CHENCHE: {
    contrato: "CHENCHE",
    municipio: "PURIFICACIÓN",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  CHICHIMENE: {
    contrato: "CUBARRAL",
    municipio: "ACACIAS",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "CHICHIMENE SW": {
    contrato: "CUBARRAL",
    municipio: "GUAMAL",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  CHIPIRÓN: {
    contrato: "CHIPIRÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  CHIRICOCA: {
    contrato: "LLA 34",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  CHUIRA: {
    contrato: "MIDAS",
    municipio: "RIO DE ORO",
    departamento: "CESAR",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  CHURUYACO: {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  CICUCO: {
    contrato: "CICUCO BOQUETE",
    municipio: "TALAIGUA NUEVO",
    departamento: "BOLIVAR",
    operador: "HOCOL S.A.",
  },
  CIRIGÜELO: {
    contrato: "CACHICAMO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  COBRA: {
    contrato: "CORCEL",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  COHEMBI: {
    contrato: "SURORIENTE",
    municipio: "PUERTO ASIS",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  COLÓN: {
    contrato: "LA PALOMA",
    municipio: "RIONEGRO",
    departamento: "SANTANDER",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  "COPA UNIFICADO": {
    contrato: "CUBIRO",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  CORAZÓN: {
    contrato: "CARARE LAS MONAS",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "PETROSANTANDER (COLOMBIA) INC.",
  },
  "CORAZÓN WEST": {
    contrato: "CARARE LAS MONAS",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "PETROSANTANDER (COLOMBIA) INC.",
  },
  "CORCEL A": {
    contrato: "CORCEL",
    municipio: "BARRANCA DE UPIA",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "CORCEL C": {
    contrato: "CORCEL",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "CORCEL D": {
    contrato: "CORCEL",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  COREN: {
    contrato: "COROCORA",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  COROCORA: {
    contrato: "COROCORA",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  CORRALES: {
    contrato: "BUENAVISTA",
    municipio: "CORRALES",
    departamento: "BOYACA",
    operador: "UNION TEMPORAL OMEGA ENERGY",
  },
  CORSUR: {
    contrato: "COROCORA",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "COSECHA-A": {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  COSTAYACO: {
    contrato: "CHAZA",
    municipio: "VILLAGARZON",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  "CRAVO ESTE": {
    contrato: "CASANARE",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  CRISTALINA: {
    contrato: "MAGDALENA MEDIO-CRISTALINA",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  "CUERVA NORESTE": {
    contrato: "LA CUERVA",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO OIL AND GAS COLOMBIA LIMITED.",
  },
  "CUERVA OESTE": {
    contrato: "LA CUERVA",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO OIL AND GAS COLOMBIA LIMITED.",
  },
  "CUERVA SUR": {
    contrato: "LA CUERVA",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO OIL AND GAS COLOMBIA LIMITED.",
  },
  CUMPLIDOR: {
    contrato: "PUT-7",
    municipio: "PUERTO ASIS",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  CUPIAGUA: {
    contrato: "AREA SANTIAGO DE LAS ATALAYAS",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "CUPIAGUA LIRIA": {
    contrato: "RECETOR",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "CUPIAGUA SUR": {
    contrato: "AREA SANTIAGO DE LAS ATALAYAS",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  CURITO: {
    contrato: "CASANARE ESTE",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "INVEPETROL LIMITED COLOMBIA",
  },
  CUSIANA: {
    contrato: "TAURAMENA ",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "CUSIANA NORTE": {
    contrato: "AREA SANTIAGO DE LAS ATALAYAS",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  DANES: {
    contrato: "LLA 23",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "DINA CRETÁCEOS": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "DINA NORTE": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "DINA TERCIARIOS": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "DOROTEA B": {
    contrato: "DOROTEA",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "NEW GRANADA ENERGY CORPORATION SUCURSAL COLOMBIA",
  },
  "DOROTEA E": {
    contrato: "DOROTEA",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "NEW GRANADA ENERGY CORPORATION SUCURSAL COLOMBIA",
  },
  "EL DIFÍCIL": {
    contrato: "EL DIFÍCIL",
    municipio: "ARIGUANI",
    departamento: "MAGDALENA",
    operador: "PETROLEOS SUD AMERICANOS SUCURSAL COLOMBIA",
  },
  "EL NIÑO": {
    contrato: "BOQUERÓN",
    municipio: "MELGAR",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  ELIZITA: {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  ESPIGUERO: {
    contrato: "LLA 78",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "VETRA EXPLORACION Y PRODUCCION COLOMBIA S.A.S. ",
  },
  ESTERO: {
    contrato: "ALCARAVÁN",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  FINN: {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  FLAMENCOS: {
    contrato: "MAGDALENA MEDIO-YARIGUI-CANTAGALLO",
    municipio: "PUERTO WILCHES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  FLOREÑA: {
    contrato: "PIEDEMONTE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "FLOREÑA MIRADOR": {
    contrato: "PIEDEMONTE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  FRANKMAVE: {
    contrato: "LLA 58",
    municipio: "PUERTO LOPEZ",
    departamento: "META",
    operador: "ANDES OPERATING COMPANY LLC SUCURSAL COLOMBIA",
  },
  GALEMBO: {
    contrato: "CHIPIRÓN",
    municipio: "ARAUCA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  GARZAS: {
    contrato: "MAGDALENA MEDIO-YARIGUI-GARZAS",
    municipio: "PUERTO WILCHES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  GAVAN: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  GIBRALTAR: {
    contrato: "SIRIRI",
    municipio: "CUBARÁ",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  GIGANTE: {
    contrato: "MATAMBO",
    municipio: "GARZON",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  GIRASOL: {
    contrato: "NARE",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  "GRETA OTO": {
    contrato: "CACHICAMO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  GUACHARACA: {
    contrato: "CACHICAMO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  GUACO: {
    contrato: "LLA 34",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  GUANAPALO: {
    contrato: "ESTERO",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  GUANDO: {
    contrato: "BOQUERÓN",
    municipio: "MELGAR",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  "GUANDO SW": {
    contrato: "BOQUERÓN",
    municipio: "MELGAR",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  GUARILAQUE: {
    contrato: "OROCUÉ",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  GUARROJO: {
    contrato: "GUARROJO",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "HOCOL S.A.",
  },
  GUASAR: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  GUATIQUIA: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  GUAYUYACO: {
    contrato: "GUAYUYACO",
    municipio: "PIAMONTE",
    departamento: "CAUCA",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  HALCÓN: {
    contrato: "CPO 5",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "ONGC VIDESH LIMITED SUCURSAL COLOMBIANA",
  },
  HAMACA: {
    contrato: "CPE-6",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  HOATZIN: {
    contrato: "CACHICAMO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "HOATZIN NORTE": {
    contrato: "CACHICAMO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  HORMIGA: {
    contrato: "AREA SUR",
    municipio: "VALLE DEL GUAMUEZ",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  IBAMACA: {
    contrato: "TOLIMA",
    municipio: "CHAPARRAL",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  INDICO: {
    contrato: "CPO 5",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "ONGC VIDESH LIMITED SUCURSAL COLOMBIANA",
  },
  INFANTAS: {
    contrato: "LA CIRA INFANTAS",
    municipio: "BARRANCABERMEJA",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  ISTANBUL: {
    contrato: "MARIA CONCHITA",
    municipio: "RIOHACHA",
    departamento: "GUAJIRA",
    operador: "MKMS ENERJI SUCURSAL COLOMBIA",
  },
  JACAMAR: {
    contrato: "LLA 34",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  JACANA: {
    contrato: "LLA 34",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  JAZMIN: {
    contrato: "NARE",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  "JIBA UNIFICADO": {
    contrato: "CHIPIRÓN",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  JORCAN: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  JORDÁN: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  JUANAMBU: {
    contrato: "GUAYUYACO",
    municipio: "VILLAGARZON",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  KANANASKIS: {
    contrato: "LLA 32",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  KIMBO: {
    contrato: "JOROPO",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "GREEN POWER SUCURSAL COLOMBIA",
  },
  KITARO: {
    contrato: "CABRESTERO",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "VERANO ENERGY (SWITZERLAND) AG SUCURSAL",
  },
  "LA BELLEZA": {
    contrato: "VIM 1",
    municipio: "PLATO",
    departamento: "MAGDALENA",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  "LA CAÑADA NORTE": {
    contrato: "SAN JACINTO",
    municipio: "PAICOL",
    departamento: "HUILA",
    operador: "HOCOL S.A.",
  },
  "La Cañada Norte PUE": {
    contrato: "SAN JACINTO",
    municipio: "PAICOL",
    departamento: "HUILA",
    operador: "HOCOL S.A.",
  },
  "LA CIRA": {
    contrato: "LA CIRA INFANTAS",
    municipio: "BARRANCABERMEJA",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  "LA FLORA": {
    contrato: "CASANARE",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "LA GLORIA": {
    contrato: "CASANARE",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "LA HOCHA": {
    contrato: "RIO PAEZ",
    municipio: "TESALIA",
    departamento: "HUILA",
    operador: "HOCOL S.A.",
  },
  "La Hocha - PUE": {
    contrato: "RIO PAEZ",
    municipio: "TESALIA",
    departamento: "HUILA",
    operador: "HOCOL S.A.",
  },
  "LA JAGUA": {
    contrato: "CAMPOS TELLO Y LA JAGUA",
    municipio: "NEIVA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "LA PUNTA": {
    contrato: "LA PUNTA",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "HOCOL S.A.",
  },
  "LA URRACA": {
    contrato: "CPO 5",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "ONGC VIDESH LIMITED SUCURSAL COLOMBIANA",
  },
  LABRADOR: {
    contrato: "LLA 23",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "LAS MARACAS ": {
    contrato: "LOS OCARROS",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  LEONO: {
    contrato: "LLA 23",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  LIBERTAD: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "LIBERTAD NORTE": {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "LILIA-ANGIE UNIFICADO": {
    contrato: "OPÓN",
    municipio: "CIMITARRA",
    departamento: "SANTANDER",
    operador: "SAINT AUBIN INTERNATIONAL SAS",
  },
  LISAMA: {
    contrato: "LISAMA-NUTRIA",
    municipio: "SAN VICENTE DE CHUCURI",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  "LLANITO UNIFICADO": {
    contrato: "MAGDALENA MEDIO-YARIGUI-CANTAGALLO",
    municipio: "BARRANCABERMEJA",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  "LLANOS-58-4": {
    contrato: "LLA 58",
    municipio: "PUERTO LOPEZ",
    departamento: "META",
    operador: "ANDES OPERATING COMPANY LLC SUCURSAL COLOMBIA",
  },
  "LOMA LARGA": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "VILLAVIEJA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  Lorito: {
    contrato: "CPO 9",
    municipio: "GUAMAL",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  LORO: {
    contrato: "AREA SUR",
    municipio: "VALLE DEL GUAMUEZ",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  "LOS ACEITES": {
    contrato: "GUACHIRÍA",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "LEWIS ENERGY COLOMBIA INC",
  },
  "LOS ANGELES": {
    contrato: "TISQUIRAMA B",
    municipio: "RIO DE ORO",
    departamento: "CESAR",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  "LOS HATOS": {
    contrato: "LOS HATOS",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "LOS POTROS": {
    contrato: "CAMPO RICO",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "EMERALD ENERGY PLC SUCURSAL COLOMBIA",
  },
  MACANA: {
    contrato: "CHIPIRÓN",
    municipio: "ARAUCA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  MAMEY: {
    contrato: "SAMAN",
    municipio: "OVEJAS",
    departamento: "SUCRE",
    operador: "HOCOL S.A.",
  },
  MANÁ: {
    contrato: "MANÁ",
    municipio: "PIEDRAS",
    departamento: "TOLIMA",
    operador: "INTEROIL COLOMBIA EXPLORATION AND PRODUCTION",
  },
  MANSOYA: {
    contrato: "NORORIENTE",
    municipio: "PUERTO CAICEDO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  MANTIS: {
    contrato: "CASIMENA",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  MARY: {
    contrato: "SANTANA",
    municipio: "PIAMONTE",
    departamento: "CAUCA",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  "MATACHÍN NORTE": {
    contrato: "ESPINAL",
    municipio: "PURIFICACIÓN",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  "MATACHÍN SUR": {
    contrato: "ESPINAL",
    municipio: "PURIFICACIÓN",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  MATEMARRANO: {
    contrato: "CRAVOVIEJO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  "MAURITÍA ESTE": {
    contrato: "MORICHE",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "SAN AGUSTIN ENERGY CORP SUCURSAL COLOMBIA",
  },
  "MAURITÍA NORTE": {
    contrato: "MORICHE",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "SAN AGUSTIN ENERGY CORP SUCURSAL COLOMBIA",
  },
  MAUTE: {
    contrato: "CPO 13",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "TECPETROL COLOMBIA SAS",
  },
  "MAX ": {
    contrato: "LLA 34",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  "MIRTO - AGAPANTO UNIFICADO": {
    contrato: "MARANTA",
    municipio: "VILLAGARZON",
    departamento: "PUTUMAYO",
    operador: "EMERALD ENERGY PLC SUCURSAL COLOMBIA",
  },
  "MONO ARAÑA": {
    contrato: "VMM 2",
    municipio: "AGUACHICA",
    departamento: "CESAR",
    operador: "GRAN TIERRA OPERATIONS COLOMBIA GMBH SUCURSAL",
  },
  MOQUETA: {
    contrato: "CHAZA",
    municipio: "MOCOA",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  MORICHE: {
    contrato: "NARE",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  MORROCOY: {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  NANCY: {
    contrato: "NANCY-BURDINE-MAXINE",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  "NARE SUR": {
    contrato: "NARE",
    municipio: "PUERTO NARE",
    departamento: "ANTIOQUIA",
    operador: "ECOPETROL S.A.",
  },
  "NASHIRA NORTE": {
    contrato: "NASHIRA",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "OIRU CORPORATION",
  },
  NUTRIA: {
    contrato: "LISAMA-NUTRIA",
    municipio: "SAN VICENTE DE CHUCURI",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  OCELOTE: {
    contrato: "GUARROJO",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "HOCOL S.A.",
  },
  "OJO DE TIGRE": {
    contrato: "JOROPO",
    municipio: "HATO COROZAL",
    departamento: "CASANARE",
    operador: "GREEN POWER SUCURSAL COLOMBIA",
  },
  OMI: {
    contrato: "LLA 61",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "SUELOPETROL, C.A. SUCURSAL COLOMBIA",
  },
  OPÓN: {
    contrato: "OPÓN",
    municipio: "CIMITARRA",
    departamento: "SANTANDER",
    operador: "SAINT AUBIN INTERNATIONAL SAS",
  },
  ORITO: {
    contrato: "ORITO",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  OROPÉNDOLA: {
    contrato: "OROPENDOLA",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  ORTEGA: {
    contrato: "ORTEGA",
    municipio: "ORTEGA",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  "OSO PARDO": {
    contrato: "SANTA ISABEL",
    municipio: "AGUACHICA",
    departamento: "CESAR",
    operador: "CARRAO ENERGY S.A. SUCURSAL COLOMBIA",
  },
  PACANDE: {
    contrato: "ORTEGA",
    municipio: "SAN LUIS",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  PACHAQUIARO: {
    contrato: "APIAY",
    municipio: "ACACIAS",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  PALAGUA: {
    contrato: "PALAGUA",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  "PALERMO - SANTA CLARA UNIFICADO": {
    contrato: "SANTA CLARA",
    municipio: "PALERMO",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  PALMARITO: {
    contrato: "GARCERO",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  PANTRO: {
    contrato: "LLA 23",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  PARAVARE: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "PAUTO SUR": {
    contrato: "PIEDEMONTE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "PAUTO SUR RECETOR": {
    contrato: "RECETOR",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  PAYOA: {
    contrato: "CARARE LAS MONAS",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "PETROSANTANDER (COLOMBIA) INC.",
  },
  "PAYOA WEST": {
    contrato: "CARARE LAS MONAS",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "PETROSANTANDER (COLOMBIA) INC.",
  },
  PEGUITA: {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "PEGUITA II": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "PEGUITA III": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "PEGUITA SW": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "PENDARE ": {
    contrato: "CPO 13",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "TECPETROL COLOMBIA SAS",
  },
  "Pendare Norte": {
    contrato: "CPO 13",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "TECPETROL COLOMBIA SAS",
  },
  "PEÑAS BLANCAS": {
    contrato: "MAGDALENA MEDIO-CASABE",
    municipio: "YONDO",
    departamento: "ANTIOQUIA",
    operador: "ECOPETROL S.A.",
  },
  "PETIRROJO UNIFICADO": {
    contrato: "CUBIRO",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  PINTADO: {
    contrato: "GUARROJO",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "HOCOL S.A.",
  },
  PIRITO: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  PISINGO: {
    contrato: "CASIMENA",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  PLATANILLO: {
    contrato: "PLATANILLO",
    municipio: "PUERTO ASIS",
    departamento: "PUTUMAYO",
    operador: "AMERISUR EXPLORACION COLOMBIA LIMITADA",
  },
  POMPEYA: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  PROVINCIA: {
    contrato: "PROVINCIA P SUR",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  Pumara: {
    contrato: "LLA 23",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  QUIFA: {
    contrato: "QUIFA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  QUILLACINGA: {
    contrato: "SURORIENTE",
    municipio: "PUERTO ASIS",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  QUINDE: {
    contrato: "SURORIENTE",
    municipio: "PUERTO ASIS",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  QURIYANA: {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  RAMIRIQUI: {
    contrato: "LLA 22",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "RANCHO HERMOSO": {
    contrato: "RANCHO HERMOSO",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "CANACOL ENERGY COLOMBIA SAS",
  },
  "RANCHO QUEMADO": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "RECETOR WEST": {
    contrato: "RECETOR",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  REDONDO: {
    contrato: "CRAVO NORTE",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "REDONDO ESTE": {
    contrato: "CRAVO NORTE",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "REMACHE NORTE": {
    contrato: "COROCORA",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  "REMACHE SUR": {
    contrato: "COROCORA",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  REX: {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "REX NE": {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  "RIO CRAVO ESTE": {
    contrato: "TAPIR",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PETROLEOS COLOMBIANOS SA",
  },
  "RÍO OPIA": {
    contrato: "RÍO OPIA",
    municipio: "PIEDRAS",
    departamento: "TOLIMA",
    operador: "INTEROIL COLOMBIA EXPLORATION AND PRODUCTION",
  },
  "RÍO SALDAÑA": {
    contrato: "TOLIMA",
    municipio: "CHAPARRAL",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  "RIO ZULIA": {
    contrato: "RIO ZULIA",
    municipio: "CUCUTA",
    departamento: "NORTE DE SANTANDER",
    operador: "IBEROAMERICANA DE HIDROCARBUROS ENERGY COLOMBIA S.A.S",
  },
  RUBIALES: {
    contrato: "RUBIALES",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  RUMBA: {
    contrato: "LLA 26",
    municipio: "AGUAZUL",
    departamento: "CASANARE",
    operador: "PAREX RESOURCES COLOMBIA LTD. SUCURSAL",
  },
  SABANERO: {
    contrato: "SABANERO",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  SAIMIRÍ: {
    contrato: "CRAVOVIEJO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  SALINA: {
    contrato: "CARARE LAS MONAS",
    municipio: "SABANA DE TORRES",
    departamento: "SANTANDER",
    operador: "PETROSANTANDER (COLOMBIA) INC.",
  },
  SALTADOR: {
    contrato: "LLA 123",
    municipio: "BARRANCA DE UPIA",
    departamento: "META",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  "SAN ANTONIO": {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  "SAN FRANCISCO": {
    contrato: "PALERMO",
    municipio: "PALERMO",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "SAN ROQUE": {
    contrato: "TISQUIRAMA-C",
    municipio: "SAN MARTÍN",
    departamento: "CESAR",
    operador: "ECOPETROL S.A.",
  },
  "SANTA LUCÍA": {
    contrato: "TISQUIRAMA-A",
    municipio: "SAN ALBERTO",
    departamento: "CESAR",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  SANTIAGO: {
    contrato: "UPIA",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "HOCOL S.A.",
  },
  "SANTO DOMINGO UNIFICADO": {
    contrato: "LA PUNTA",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "HOCOL S.A.",
  },
  SARDINAS: {
    contrato: "GARCERO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  SARDINATA: {
    contrato: "TIBU",
    municipio: "TIBU",
    departamento: "NORTE DE SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  SAURIO: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  SUCIO: {
    contrato: "AREA OCCIDENTAL",
    municipio: "ORITO",
    departamento: "PUTUMAYO",
    operador: "ECOPETROL S.A.",
  },
  SURIA: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "SURIA SUR": {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  TELLO: {
    contrato: "CAMPOS TELLO Y LA JAGUA",
    municipio: "NEIVA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "TEMPRANILLO UNIFICADO": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  TENAY: {
    contrato: "PIJAO-POTRERILLO",
    municipio: "AIPE",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  TERECAY: {
    contrato: "COSECHA",
    municipio: "ARAUQUITA",
    departamento: "ARAUCA",
    operador: "SIERRACOL ENERGY ARAUCA LLC",
  },
  TESORO: {
    contrato: "LISAMA-NUTRIA",
    municipio: "SAN VICENTE DE CHUCURI",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  TIBÚ: {
    contrato: "TIBU",
    municipio: "TIBU",
    departamento: "NORTE DE SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  "TIGANA ": {
    contrato: "LLA 34",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  TILO: {
    contrato: "LLA 34",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  TILODIRÁN: {
    contrato: "RIO VERDE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  TINAMU: {
    contrato: "CPO 9",
    municipio: "CASTILLA NUEVA",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  TISQUIRAMA: {
    contrato: "TISQUIRAMA-C",
    municipio: "SAN MARTÍN",
    departamento: "CESAR",
    operador: "ECOPETROL S.A.",
  },
  TOCARIA: {
    contrato: "CASANARE",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  TOLDADO: {
    contrato: "TOLDADO",
    municipio: "ORTEGA",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  "TOQUI TOQUI": {
    contrato: "PULI",
    municipio: "PIEDRAS",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  TORITOS: {
    contrato: "LLA 123",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  "TORO SENTADO": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "TORO SENTADO NORTE": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "TORO SENTADO WEST": {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  TOROYACO: {
    contrato: "SANTANA",
    municipio: "MOCOA",
    departamento: "PUTUMAYO",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  TOTARE: {
    contrato: "ARMERO",
    municipio: "ALVARADO",
    departamento: "TOLIMA",
    operador: "HOCOL S.A.",
  },
  TUA: {
    contrato: "LLA 34",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
  TULIPÁN: {
    contrato: "GUACHIRIA SUR",
    municipio: "TRINIDAD",
    departamento: "CASANARE",
    operador: "MONTAJES JM S.A.",
  },
  TURPIAL: {
    contrato: "TURPIAL",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "TPL COLOMBIA LTD - SUCURSAL COLOMBIA",
  },
  UNDERRIVER: {
    contrato: "NARE",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "ECOPETROL S.A.",
  },
  "UNIFICADO PALOGRANDE": {
    contrato: "PIJAO-POTRERILLO",
    municipio: "NEIVA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  "Unificado Río Ceibas": {
    contrato: "CAGUAN",
    municipio: "NEIVA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  UNUMA: {
    contrato: "CARACARA",
    municipio: "PUERTO GAITAN",
    departamento: "META",
    operador: "COLOMBIA ENERGY DEVELOPMENT CO",
  },
  "VALDIVIA - ALMAGRO": {
    contrato: "VALDIVIA - ALMAGRO",
    municipio: "PUERTO LOPEZ",
    departamento: "META",
    operador: "IBEROAMERICANA DE HIDROCARBUROS ENERGY COLOMBIA S.A.S",
  },
  VELASQUEZ: {
    contrato: "GUAGUAQUI - TERAN",
    municipio: "PUERTO BOYACA",
    departamento: "BOYACA",
    operador: "MANSAROVAR ENERGY COLOMBIA LTD",
  },
  VENUS: {
    contrato: "CPO 11",
    municipio: "SAN MARTÍN",
    departamento: "META",
    operador: "HUPECOL OPERATING CO LLC",
  },
  VIGIA: {
    contrato: "CAMPO RICO",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "EMERALD ENERGY PLC SUCURSAL COLOMBIA",
  },
  "VIGIA SUR": {
    contrato: "CAMPO RICO",
    municipio: "YOPAL",
    departamento: "CASANARE",
    operador: "EMERALD ENERGY PLC SUCURSAL COLOMBIA",
  },
  VIKINGO: {
    contrato: "LLA 47",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "INTEROIL COLOMBIA EXPLORATION AND PRODUCTION",
  },
  VIREO: {
    contrato: "OROPENDOLA",
    municipio: "SAN LUIS DE PALENQUE",
    departamento: "CASANARE",
    operador: "PERENCO COLOMBIA LIMITED",
  },
  YAGUARA: {
    contrato: "HOBO",
    municipio: "YAGUARA",
    departamento: "HUILA",
    operador: "ECOPETROL S.A.",
  },
  YAGUAZO: {
    contrato: "ARRENDAJO",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  YAMÚ: {
    contrato: "YAMU",
    municipio: "PAZ DE ARIPORO",
    departamento: "CASANARE",
    operador: "PERENCO OIL AND GAS COLOMBIA LIMITED.",
  },
  "YARIGUÍ-CANTAGALLO": {
    contrato: "MAGDALENA MEDIO-YARIGUI-CANTAGALLO",
    municipio: "PUERTO WILCHES",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  YATAY: {
    contrato: "GUATIQUIA",
    municipio: "CABUYARO",
    departamento: "META",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  YENAC: {
    contrato: "CASIMENA",
    municipio: "MANI",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  ZOE: {
    contrato: "MIDAS",
    municipio: "SAN MARTÍN",
    departamento: "CESAR",
    operador: "GRAN TIERRA ENERGY COLOMBIA GMBH SUCURSAL COLOMBIA",
  },
  ZOPILOTE: {
    contrato: "CRAVOVIEJO",
    municipio: "OROCUE",
    departamento: "CASANARE",
    operador: "FRONTERA ENERGY COLOMBIA CORP., SUCURSAL COLOMBIA",
  },
  ZORZAL: {
    contrato: "LLA 87",
    municipio: "VILLA NUEVA",
    departamento: "CASANARE",
    operador: "GEOPARK COLOMBIA S.A.S.",
  },
};
