import { Publisher, Subjects, TicketUpdatedEvent } from '@ggaorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
};



