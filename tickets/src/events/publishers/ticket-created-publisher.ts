import { Publisher, Subjects, TicketCreatedEvent } from '@ggaorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
};



