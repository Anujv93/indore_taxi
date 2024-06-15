function ReturnandRefund() {
  return (
    <div className="bg-gray-100 py-100 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Indore Taxi Policies
      </h1>

      <div className="policy-section bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Terms and Conditions:</h2>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Reservation:</strong> All car rental reservations are
            subject to availability and confirmation. We reserve the right to
            refuse service to anyone at our discretion.
          </li>
          <li>
            <strong>Payment:</strong> Full payment is required at the time of
            reservation. We accept major credit cards and cash payments.
          </li>
          <li>
            <strong>Cancellation Policy:</strong> Cancellations made at least 24
            hours prior to the scheduled trip start time will receive a full
            refund. No refunds will be issued for cancellations made less than
            24 hours before the trip start time.
          </li>
          <li>
            <strong>Vehicle Pickup and Return:</strong> The vehicle must be
            picked up and returned at the agreed-upon location and time. Late
            returns may incur additional fees.
          </li>
          <li>
            <strong>Vehicle Condition:</strong> The renter is responsible for
            returning the vehicle in the same condition as it was received. Any
            damage to the vehicle will be assessed and charged accordingly.
          </li>
          <li>
            <strong>Insurance:</strong> Basic insurance coverage is included in
            the rental fee. Additional insurance options are available at an
            extra cost.
          </li>
          <li>
            <strong>Prohibited Use:</strong> The rented vehicle must not be used
            for any illegal activities or purposes prohibited by law. Violation
            of this policy may result in termination of the rental agreement and
            additional fees.
          </li>
          <li>
            <strong>Maintenance and Repairs:</strong> We will provide a
            well-maintained and roadworthy vehicle for your rental period. In
            the event of mechanical issues, we will strive to provide a
            replacement vehicle as soon as possible.
          </li>
          <li>
            <strong>Limitation of Liability:</strong> We are not liable for any
            damages, injuries, or losses incurred during the rental period,
            including but not limited to accidents, theft, or property damage.
          </li>
          <li>
            <strong>Jurisdiction:</strong> These terms and conditions are
            governed by the laws of [Your Jurisdiction], and any disputes shall
            be resolved in the courts of [Your Jurisdiction].
          </li>
        </ol>
      </div>

      <div className="policy-section bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Refund and Return Policy:</h2>
        <ul className="list-disc pl-5">
          <li>
            A full refund will be issued if the reservation is canceled at least
            24 hours before the scheduled trip start time.
          </li>
          <li>
            No refunds will be issued for cancellations made less than 24 hours
            before the trip start time.
          </li>
          <li>
            Once the rental period begins, no refunds will be provided for early
            returns or unused rental days.
          </li>
          <li>
            Any changes to the reservation must be made at least 24 hours before
            the scheduled trip start time and are subject to availability.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReturnandRefund;
