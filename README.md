# Azure Service Bus - Deduplicação de mensangens

Em sistemas modernos, garantir a entrega única de mensagens é essencial para evitar redundâncias e inconsistências. O Azure Service Bus oferece um mecanismo robusto de deduplicação de mensagens que ajuda a garantir que, mesmo em cenários de falha ou retransmissão, cada mensagem seja processada apenas uma vez. Esse recurso é especialmente útil em aplicações críticas onde a confiabilidade e a precisão são indispensáveis, como fluxos financeiros, workflows complexos e integração entre serviços distribuídos.
Com a deduplicação, o Service Bus protege contra duplicatas e mantém a integridade do sistema, tornando-o mais eficiente e confiável.

## Contexto de uso
Existem vários contextos para que a deduplicação de mensagens seja utilizada. Para exemplificar, um destes contextos seria, por exemplo, um sistema financeiro em que a transação poderá ser processada somente uma única vez a fim de evitar qualquer novo envio para a mesma transação.

## Configuração prática
A deduplicação de mensagens no Azure Service Bus é implementada através do uso do MessageId, um identificador único que acompanha cada mensagem enviada. O Service Bus utiliza esse identificador para rastrear mensagens dentro de um período especificado conhecido como janela de deduplicação, que é configurada no nível da fila ou tópico.

#### Fluxo de funcionamento
- Quando uma mensagem é recebida, o Service Bus verifica seu MessageId contra os identificadores de mensagens já processadas na janela de deduplicação.
- Caso o MessageId já tenha sido registrado, a mensagem duplicada é descartada silenciosamente.
- Se o MessageId for único ou estiver fora do período da janela, a mensagem será processada normalmente.

#### Observações
- Configuração do MessageId: a aplicação que envia mensagens para o Service Bus deve garantir que o campo MessageId seja configurado corretamente. Esse identificador pode ser gerado com base em critérios relevantes ao cenário da aplicação, como IDs de transações ou hashes de conteúdo.
- Janela de deduplicação: a janela de deduplicação tem um valor padrão de 7 dias, que pode ser ajustado conforme necessário ao criar ou modificar o namespace do Service Bus. O valor máximo é 7 dias e o mínimo 20 segundos.

## Pontos importantes
Apesar de haver este recursos em alguns messages brokers (Azure Service Bus, SQS, SNS, etc), a aplicação precisa garantir a idempotência das operações, ou seja, garantir que a mesma entrada de dados tenha a mesma saída. Com isso, caso por algum motivo o fluxo de deduplicação falhar, a sua aplicação estará ápta para processar a mesma mensagem N vezes sem surgir efeitos colaterais.
