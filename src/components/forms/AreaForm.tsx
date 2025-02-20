import { areaSchema, AreaSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createArea, updateArea } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AreaForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AreaSchema>({
    resolver: zodResolver(areaSchema),
  });

  const [state, formAction] = useFormState(type === "create" ? createArea : updateArea, {
    success: false,
    error: false,
  });

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Area has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const smasters = relatedData?.smasters || [];
  const tasks = relatedData?.tasks || [];

  return (
    <form className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold text-gray-700">{type === "create" ? "Create a New Area" : "Update Area"}</h1>
      <span className="text-sm text-gray-500 font-medium">Fill in the details below</span>

      <div className="flex flex-wrap gap-6">
        <InputField
          label="Area Name"
          name="areaname"
          defaultValue={data?.name}
          register={register}
          error={errors?.areaname}
        />

        {data && (
          <InputField
            label="ID"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Smasters</label>
          <select
            multiple
            className="border border-gray-300 p-2 rounded-md text-sm"
            {...register("smasters")}
            defaultValue={data?.smasters}
          >
            {smasters.map((smaster: { id: string; name: string; surname: string }) => (
              <option value={smaster.id} key={smaster.id}>
                {smaster.name} {smaster.surname}
              </option>
            ))}
          </select>
          {errors.smasters?.message && (
            <p className="text-xs text-red-500">{errors.smasters.message.toString()}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Tasks</label>
          <select
            multiple
            className="border border-gray-300 p-2 rounded-md text-sm"
            {...register("tasks")}
            defaultValue={data?.tasks}
          >
            {tasks.map((task: { id: string; name: string }) => (
              <option value={task.id} key={task.id}>{task.name}</option>
            ))}
          </select>
          {errors.tasks?.message && (
            <p className="text-xs text-red-500">{errors.tasks.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && <span className="text-red-500 text-sm">Something went wrong!</span>}

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        {type === "create" ? "Create Area" : "Update Area"}
      </button>
    </form>
  );
};

export default AreaForm;
