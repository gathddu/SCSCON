falta fazer:

- tudo

documentação de verdade

A web application that enables collaborative security through geolocation-based alerts, real-time data visualization and role-based community engagement. Built for the public services innovation hackathon addressing urban safety challenges in the Federal District.

## Technical Overview

**Arquitetura:** Monorepo full-stack TypeScript com comunicação cliente-servidor type-safe  
**Alvo de Deploy:** Cloud-native com suporte a containerização  
**Banco de Dados:** Relacional (MySQL) com camada de abstração ORM  
**Camada de API:** Type safety end-to-end via tRPC v11  
**Gerenciamento de Estado:** React Query para sincronização de estado do servidor

## Features

### 1. Sistema de Alertas Baseado em Geolocalização
- **Botão de pânico** com integração da API de Geolocalização HTML5
- Transmissão de alertas em tempo real para segmentos de usuários baseados em proximidade
- Sistema de classificação de incidentes em seis categorias
- Fluxo de status em quatro estágios (pendente → em andamento → resolvido → falso alarme)
- Histórico persistente de alertas com busca full-text

### 2. Visualização Interativa com Heatmap
- Mapeamento dinâmico de densidade usando algoritmos de clustering de coordenadas
- Análise de padrões temporais (agregações por hora do dia, dia da semana)
- Identificação de hotspots geográficos
- Analytics exportáveis para relatórios de stakeholders

### 3. Integração de Assistência Social
- Submissão de solicitações preservando privacidade
- Roteamento direto para assistentes sociais certificados
- Fluxo de gerenciamento de casos
- Canais de comunicação confidenciais

### 4. Hub de Engajamento Comunitário
- Quadro de conteúdo multi-categoria (eventos, promoções, empregos)
- Métricas de engajamento (curtidas, visualizações)
- Filtros de conteúdo e busca
- Ferramentas de promoção de negócios para comerciantes locais

### 5. Dashboard Administrativo de Analytics
- Monitoramento de KPIs em tempo real (volume de alertas, tempos de resposta, taxas de resolução)
- Visualização interativa de dados (biblioteca Recharts)
- Gerenciamento de usuários com RBAC (Controle de Acesso Baseado em Perfis)
- Análise de padrões de incidentes e relatórios

### 6. Controle de Acesso Baseado em Perfis (RBAC)
- **Cidadão:** Criação de alertas, navegação de oportunidades
- **Comerciante:** Gerenciamento de negócios, resposta a alertas
- **Segurança:** Monitoramento de alertas, coordenação de patrulha
- **Assistente Social:** Tratamento de solicitações de assistência
- **Administrador:** Acesso completo ao sistema, analytics, gerenciamento de usuários
