import Button from '@/components/ui/button';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useUpdateRefundMutation } from '@/graphql/refunds.graphql';
import SelectInput from '@/components/ui/select-input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

interface FormValues {
  status: any;
}

// enum RefundStatus {
//   APPROVED = "approved",
//   PENDING = "pending",
//   REJECTED = "rejected",
//   PROCESSING = "processing",
// }

const RefundStatus = [
  {
    value: 'APPROVED',
    name: 'Approved',
  },
  {
    value: 'PENDING',
    name: 'Pending',
  },
  {
    value: 'REJECTED',
    name: 'Rejected',
  },
  {
    value: 'PROCESSING',
    name: 'Processing',
  },
];

const UpdateRefundConfirmationView = () => {
  const { t } = useTranslation('common');
  const { handleSubmit, control } = useForm<FormValues>();

  const [updateRefund, { loading }] = useUpdateRefundMutation({
    onCompleted: () => {
      toast.success(t('common:update-success'));
    },
  });

  const { data: id } = useModalState();
  const { closeModal } = useModalAction();

  async function handleUpdateRefundStatus({ status }: FormValues) {
    const input = {
      status: status?.value,
    };

    updateRefund({
      variables: {
        input: { id, ...input },
      },
    });
    closeModal();
  }

  return (
    // <Form<FormValues> onSubmit={handleUpdateRefundStatus}>
    <form onSubmit={handleSubmit(handleUpdateRefundStatus)} noValidate>
      {/* {({ register }) => ( */}
      <div className='m-auto flex w-full max-w-sm flex-col rounded bg-light p-5 sm:w-[24rem]'>
        {/* <select {...register("status")}>
            {Object.keys(RefundStatus).map((status, idx) => (
              <option value={status.toLowerCase()} key={idx}>
                {status}
              </option>
            ))}
          </select> */}
        <div className='mb-5 text-center text-lg font-semibold text-body'>
          {t('text-update-refund')}
        </div>

        <SelectInput
          name='status'
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={RefundStatus}
        />

        <Button className='mt-3' loading={loading} disabled={loading}>
          {t('text-shop-approve-button')}
        </Button>
      </div>
      {/* )} */}
    </form>
    // </Form>
  );
};

export default UpdateRefundConfirmationView;
