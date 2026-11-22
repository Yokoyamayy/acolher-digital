(Versão 0.6) ----------------------------------------------------------------------

Otimização de Densidade, Toolbar Compacta e Ações na Fila de Triagem:
- Coluna Paciente com Dados em Linhas Dedicadas: Nome (linha 1), Idade (linha 2) e Telefone (linha 3), sem número de prontuário na tabela para leitura instantânea.
- Aba Lateral Enxuta e Alinhada: Redução da largura da sidebar (lg:w-56), remoção dos contadores numéricos de notificação e alinhamento contínuo do rótulo logo ao lado do ícone (justify-start gap-2).
- Prioridade, Documentação e Origem em Texto Puro: Remoção de badges/pílulas coloridas dessas três colunas na Fila de Triagem, deixando apenas texto limpo para menor carga visual.
- Paginação e Filtro de Desfecho na Fila de Triagem: Barra inferior com seletor de itens por página (5, 10, 15, 25 ou Todos) e opção de filtro "Desfecho: Saída da Fila" para consultar desistências/encaminhamentos com ações de Triagem e Reativar.
- Modal Triagem em Seções Planas Unificadas: Remoção do botão "Baixar Arquivo" do rodapé e dos cards internos; contato de emergência e responsável legal com nome na primeira linha e telefone abaixo; seção de Desfecho Registrado para saídas; Triagem Inicial preenchível com autoria e histórico; e Documentos com Termo de Responsabilidade, Ficha Completa e upload direto.
- Padronização Visual dos Modais da Fila: Modais Cadastrar Paciente (#newPatientModal), Vincular (#matchModal) e Desfecho (#queueDismissModal) alinhados à mesma estrutura do Modal Triagem (max-w-2xl, seções planas sem cards internos).
- Padronização Integral dos 12 Modais (Referência Prontuário): Todos os 12 modais do sistema (#prontuarioModal, #docPreviewModal, #volunteerDetailModal, #newPatientModal, #newVolunteerModal, #matchModal, #remanejarModal, #patientInterruptModal, #queueDismissModal, #scheduleSlotModal, #staffMemberModal e #confirmActionModal) foram unificados com a arquitetura do Modal Prontuário: escala coerente de larguras (max-w-4xl para fichas/cadastros completos, max-w-2xl para fluxos operacionais e max-w-md para confirmações), cabeçalho azul rico (bg-blue-600 text-white) com pill translúcido de código/categoria (bg-white/15 border border-white/30), badge branco de status (bg-white text-blue-700), título em destaque, linha contextual de metadados em text-blue-100 e botão de fechar padronizado; fichas de consulta (#docPreviewModal e #volunteerDetailModal) reestruturadas na mesma ordem do Prontuário (Dados Cadastrais expansíveis, Documentos expansíveis com Baixar Todos, card resumo em bg-blue-50 border-blue-300 e card principal destacado em border-2 border-blue-200) com botão "Baixar Ficha PDF" no rodapé; cadastros completos (#newPatientModal e #newVolunteerModal) organizados em blocos expansíveis <details open>; alertas semânticos unificados; rodapés padronizados (bg-slate-100 border-t border-slate-300); e ciclo de vida único com reset de rolagem em openModal() e proteção contra descarte de alterações não salvas via requestCloseModal() (botão X, Cancelar/Fechar, backdrop e tecla Escape).
- Modal Cadastrar Paciente Simplificado: Remoção do campo manual de Idade (com cálculo automático a partir da Data de Nascimento) e substituição do checkbox do Termo de Responsabilidade por opção direta de upload de arquivo.
- Modal Desfecho com Autoria Visível: Exibição destacada do usuário responsável e data/hora do registro no próprio modal, além da listagem no filtro Desfecho: Saída da Fila e logs.
- Modelo Completo de Dados Cadastrais da Planilha (Etapa 1): Todos os registros de waitingQueue (Q1–Q11), dismissedQueue (D1–D2) e patients (P1–P17) passaram a replicar os 27 campos da planilha de inscrição (Carimbo de data/hora, CPF, RG, Data de Nascimento, Idade, Sexo, Estado Civil, Profissão, Escolaridade, Telefone/WhatsApp, Endereço com bairro/cidade/CEP, E-mail, Contato de Emergência, Limitação, Programa Social + qual, Motivo principal, Maiores queixas, Acompanhamento anterior, Diagnóstico, Trabalhando no momento, Disponibilidade, Preferência Individual/Grupo, Acesso à internet/online, Informações adicionais e Autorização), com helper getNormalizedRegistrationData() e propagação integral em confirmPatientMatch().
- Modal Triagem Completo com 27 Campos (Etapa 2): Reorganização dos dados cadastrais em 4 subseções planas (Identificação e Contato, Situação Socioeconômica e Acessibilidade, Informações Clínicas da Inscrição, Preferências de Atendimento e Autorização), preservando Desfecho Registrado, Triagem Inicial preenchível e Documentos.
- Modal Cadastrar Paciente Completo (Etapa 3): Formulário #newPatientModal ampliado com todos os campos da planilha (CPF com máscara, RG, Sexo, Estado Civil, Escolaridade, Profissão, Situação de Trabalho, E-mail, Endereço com CEP, Limitação, Programa Social com campo condicional "Se sim, qual?", Questionário clínico, Preferência Individual/Grupo, Acesso à Internet/Online e Autorização), mantendo cálculo automático da idade pela Data de Nascimento e upload do Termo de Responsabilidade.
- Dados Cadastrais Completos no Prontuário (Etapa 4): Bloco expansível #prontuarioRegistrationDetails em #prontuarioModal exibindo os 27 campos da inscrição via helper reutilizável renderPatientRegistrationDetailsHtml(), respeitando o bloqueio de sigilo clínico.
- Adequação Completa e Evolução dos Psicólogos Voluntários (15 colunas da planilha + Blocos A e B): Todos os 15 registros de state.volunteers (V1–V15) replicam Carimbo de data/hora, Endereço de e-mail, Nome Completo, Telefone/WhatsApp oficial, E-mail de contato, CPF, Situação CRP (Ativo ou Graduação concluída aguardando emissão), Rede Social/LinkedIn, Modalidade de Atendimento, Especialidade, Público-Alvo Preferencial, Experiência Anterior, Proposta de Atendimento, Sessões/semana, Horários Disponíveis e Status (Ativo/Inativo), com getNormalizedVolunteerData(), downloadVolunteerTermo() e escapeHtml(); sincronização dinâmica de ocupadas e relatosAtrasados com state.patients em syncVolunteerOccupiedCounts() (com pluralização correta); validação explícita impedindo redução de limite abaixo das vagas ocupadas, CPF/nome duplicado e inativação/exclusão com pacientes ativos vinculados; alertas de pendência de CRP/Termo e bloqueio de inativos em #matchModal, #remanejarModal e Agenda; modal #volunteerDetailModal enriquecido com carteira de pacientes ativos vinculados, lista completa de documentação (Termo de Voluntariado, CRP, RG/CPF, Diploma, Currículo e anexos extras) com download individual e "Baixar Todos" + exclusão segura; modal #newVolunteerModal ampliado para max-w-4xl com grade interativa 7x24 de disponibilidade horária (arraste, linha "Todos os dias", atalhos rápidos 06h-18h/Comercial/Noturno/Limpar e resumo automático) e seção ampliada de documentos (#volModalDocsList); card unificado em #view-voluntarios com botão "Exportar Psicólogos" (ícone upload) e ícone filter unificado em #volFilterSelect (alinhado ao padrão da Triagem e Pacientes, com ícones upload de exportação nas três telas), busca por telefone, 5 colunas reorganizadas (Psicólogo com Nome + CRP abaixo, Contato, Especialidade, Vagas / Horários e Ações), ordenação clicável nas colunas, paginação configurável (5/10/15/25/Todos), 3 botões verticais empilhados padronizados em Ações (Ficha, Editar, Inativar para Ativos; Ficha, Reativar, Excluir para Inativos) e auditoria completa em state.automationLogs.
- Evolução da Tela de Pacientes e Correções Clínicas (Blocos A e B): Correção da contagem de sessões em saveSessionEvolution() sem regressão em históricos resumidos e registro do usuário logado como autor; validação de conflito de horário no #remanejarModal padronizado em max-w-2xl com modalidade e autoria; criação do modal de registro #patientInterruptModal (Alta Clínica, Interrupção com motivo obrigatório ou Exclusão); auditoria completa em state.automationLogs para Alta, Interrupção, Reativação, Remanejamento e Exclusão; card unificado em #view-pacientes com botão "Exportar Pacientes", busca ampliada, filtros de status estritos (Ativo, Concluído, Interrompido) e por psicólogo, ordenação cronológica de Agenda Fixa (Seg -> Sáb + horário via getAgendaSortRank), paginação configurável (5/10/15/25/Todos), célula Paciente em 3 linhas, Status em texto puro e 3 botões empilhados padronizados em Ações (Prontuário, Remanejar, Registro para Ativos; Prontuário, Reativar, Excluir para Interrompidos); campo dedicado para preenchimento da Anamnese (Sessão 1) dentro do Prontuário Clínico (#regSessionAnamnese) com salvaguarda ao fechar; seção expansível "Documentos" no Modal Prontuário (#prontuarioDocumentsDetails) listando todos os documentos da Fila de Triagem (Termo de Responsabilidade, Ficha Completa, RG/CPF, Guia CRAS/Comprovante e anexos personalizados propagados em confirmPatientMatch) com download individual e botão "Baixar Todos"; e botão "Baixar Breve Relato" (#btnModalDownloadBriefReport) no rodapé do Prontuário para baixar o registro detalhado de todas as sessões do paciente.
- Cadastro Expandido: Campos opcionais de Responsável Legal e Contato de Emergência adicionados ao modal de cadastro na fila, com Termo de Responsabilidade atualizado.
- Botões de Ação Padronizados: Botões "Vincular", "Triagem" e "Desfecho" organizados verticalmente com largura e altura estritamente uniformes (w-24 h-7).
- Remoção Completa de Emojis dos Campos: Interface limpa e formal sem emojis em seletores de status de contato, elegibilidade clínica e tabelas.
- Barra Unificada de Busca e Filtro Dropdown no Card de Cabeçalho: Card de cabeçalho da Fila de Triagem unificado na mesma div com a barra de pesquisa e o seletor de filtros padronizado no formato "Atributo: Valor" (Prioridade, Documentação e Origem) e botão contextual de limpar.
- Botões de Topo com Dimensões Uniformes: Botões "Exportar Fila" e "Cadastrar Paciente na Fila" com largura e altura idênticas (w-full sm:w-56 h-9).
- Coluna Documentação: Renomeação do cabeçalho "Termo (TCLE)" para "Documentação" na tabela e no detalhe de triagem.
- Coluna Origem no lugar de Status Contato: Exibição da fonte de encaminhamento/inscrição do paciente (Encaminhamento CRAS Butantã, Assistente Social, Inscrição Espontânea) com ordenação clicável e filtros dedicados.
- Modal Triagem Reestruturado e Preenchível: Exibição de Nome do Paciente, Data de Nascimento (Idade), Telefone, Endereço, Data de Inscrição, Queixa Principal, Modalidade, Disponibilidade, Origem, seção dedicada Documentação (com homologação/download de TCLE) e campo editável "Triagem Inicial" com salvamento seguro e confirmação contra descarte acidental.

(Versão 0.5) ----------------------------------------------------------------------

Ajustes de Usabilidade fundamentados nas 10 Heurísticas de Jakob Nielsen:

Controle e Liberdade (H3):
- Suporte universal ao fechamento de modais com a tecla Escape.
- Fechamento de modais ao clicar no backdrop escuro (área externa).
- Proteção contra perda acidental de anotações no prontuário: aviso de confirmação antes de descartar relatos não salvos.

Visibilidade e Status do Sistema (H1 e H6):
- Empty states ilustrados e amigáveis em todas as tabelas (Fila de Triagem, Pacientes, Psicólogos, Perfis e Documentos) com botão para limpar busca e filtros.
- Empty state ilustrado na visualização da Agenda quando não há atendimentos agendados para o filtro ativo.
- Notificações toast aprimoradas com ícones visuais para sucesso, aviso e informação.

Correspondência com o Mundo Real e Padrões (H2 e H4):
- Substituição da nomenclatura genérica "Nova Pasta Digital" por "Cadastrar Paciente na Fila" (na Fila) e "Novo Paciente" (em Pacientes).
- Padronização do termo "Match" para "Vincular Paciente ao Psicólogo" em botões, modais e mensagens de toast.
- Hierarquização visual dos botões de ação na tabela de Pacientes, destacando o acesso ao Prontuário como ação primária.

Prevenção e Diagnóstico de Erros (H5, H6 e H9):
- Indicação visual da carga e vagas disponíveis de cada psicólogo diretamente no seletor de Vínculo, desabilitando psicólogos lotados e selecionando automaticamente o primeiro com vaga livre.
- Validação inline em formulários com destaque visual em vermelho nos campos obrigatórios pendentes.
- Avisos detalhados e explicativos nas confirmações de exclusão de pacientes e psicólogos voluntários.

Flexibilidade, Eficiência e Ajuda Contextual (H7, H8 e H10):
- Atalho da tecla Enter em campos de busca para agilizar consultas imediatas.
- Ícones de ajuda contextual com tooltips explicativos nas colunas de Prioridade (critérios do CRAS), Status (regras de faltas) e Ciclo (psicoterapia breve).

Enriquecimento e Reorganização da Fila de Triagem (Administrativo & Coordenação Técnica):
- Colunas Reorganizadas: Paciente (nome, idade, telefone e prontuário), Data Inscrição (data e tempo decorrido), Prioridade (badge e origem; queixa mantida exclusivamente no modal para despoluir a tabela), Termo (TCLE), Status Contato e Ações.
- Ordenação Clicável por Cabeçalho: clique em qualquer cabeçalho da tabela para ordenar imediatamente por Paciente (A-Z/Z-A), Data de Inscrição (tempo de espera), Prioridade clínica, Regularidade do TCLE ou Status de Contato, com ícones visuais de direção.
- Coluna Status de Contato: seletor interativo em tempo real para equipe administrativa registrar e alternar entre "Sem contato", "Contato realizado" e "Aguardando retorno".
- Exportação da Fila: botão dedicado "Exportar Fila" gerando planilha oficial consolidada (Fila_Triagem_CACS.xlsx) para prestação de contas com o CRAS Butantã.
- Filtros Rápidos Operacionais: novos botões de filtro para "TCLE Pendente" e "Aguardando Contato" com contadores dinâmicos.
- Rastreabilidade Ética e Elegibilidade Técnica: inclusão formal do Profissional Triador, Parecer de Elegibilidade para Psicoterapia Breve e Modalidade Recomendada (Online vs. Polo CACS) na Ficha de Triagem e no Cadastro de Paciente.
- Desfecho de Fila: modal e fluxo seguro de desfecho/arquivamento da fila sem atendimento (desistência, 3 tentativas sem contato, encaminhamento externo ao CAPS/SUS) com justificativa e registro em log de auditoria.

(Versão 0.4) ----------------------------------------------------------------------

Contador de + e - no prontuário para adicionar ou reduzir sessões extras livremente

Remoção da barra superior do site

Botões de Exportar Planilha e Nova Pasta Digital movidos para a aba Pacientes (e Exportar Planilha também em Psicólogos Voluntários)

Remoção do texto "CACS • Gestão Unificada" abaixo de AcolherDigital no menu lateral

Remoção do texto "Psicoterapia Breve (Ciclo de 12 Sessões)" na tela Início

Remoção do botão Simulador de Sigilo do menu lateral

Renomeação do menu para Início, Fila de Triagem, Pacientes, Agenda, Equipe, Gestão de Acessos, Documentos e Configurações

Unificação de Coordenação Técnica, Coordenação Administrativa e Admins de TI na página Perfis com filtros por categoria

Menu com setinha para cima no usuário do rodapé com opções de Meu Perfil e Sair

Sincronização bidirecional de dados entre Meu Perfil e os cadastros de Psicólogos Voluntários e Perfis

Visualização em Lista na Agenda com filtro por psicólogo e cards grandes agrupados por dia da semana e horário

(Versão 0.3) ----------------------------------------------------------------------

Removido o modo escuro e todos os códigos técnicos ou referências de leis da interface.

Menu lateral fixado para acompanhar o scroll da página, com badges em cinza exibindo as pendências de cada aba.

Bordas e contornos reforçados em toda a interface para melhorar o contraste.

Tela de login substituída por um formulário comum com usuário admin e senha 1234, bloqueio após 3 erros e botão para restaurar tentativas.

Criadas as abas Coord. Técnica, Coord. Administrativa e Admins de TI com cadastro, edição de contato e exclusão.

Criada a aba Acessos e Permissões para gerar logins e senhas reais a partir de qualquer membro cadastrado, permitindo combinar permissões de outros grupos e testar o acesso na tela de login.

Simulador de sigilo administrativo passou a bloquear também os downloads de prontuários e triagens.

Painel Geral simplificado sem o botão de Match no topo e com acesso ao prontuário clicando direto no nome do paciente em Sessões de Hoje.

Prontuário passou a exibir prontuário e status antes do nome, navegação livre entre sessões, cores diferentes para falta justificada e injustificada, e limite único de extensão para 14 sessões.

Fila de Espera atualizada com Prioridade Muito Alta em vermelho, Prioridade Alta em laranja, origem Assistente Social, tag TCLE Pendente em linha única com opção de homologar ao passar o mouse.

Criação de paciente na fila passou a exigir todos os campos com placeholders, aceitar apenas números no telefone, permitir rolagem no modal, cadastrar múltiplos horários disponíveis e entrar apenas na fila.

Modal de Match passou a exibir a disponibilidade do paciente no topo, alertar em vermelho quando o horário escolhido estiver fora dessa lista e bloquear choques de horário.

Meus Pacientes ganhou ordenação da lista, botões para concluir ou interromper paciente, trava de paciente/psicólogo ao editar apenas Dia/Hora e alinhamento fixo dos botões em todas as linhas.

Psicólogos Voluntários passou a exigir todos os campos e a marcação do termo para cadastrar, ganhou edição de e-mail/telefone/vagas, exclusão de cadastro e tag estilizada para relatos em dia.

Agenda ajustada para caber na tela sem rolagem horizontal, com trava de limite máximo de vagas por psicólogo, navegação de semanas e modo de Disponibilidade dos Pacientes sem datas, com filtro por paciente e botões em posição fixa.

Documentos e Modelos corrigido para não sumir ícones ao filtrar, sem tags de canto e apenas com o botão Baixar.

Automação ajustada com chaves individuais para E-mail, WhatsApp e Backup Drive e botão Disparar em posição fixa (desabilitado quando nenhuma chave está ativa).
