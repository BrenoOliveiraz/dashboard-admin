export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold">Entregas</h3>
          <p className="text-2xl font-bold">125</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold">Usuários</h3>
          <p className="text-2xl font-bold">34</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold">Produtos</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
