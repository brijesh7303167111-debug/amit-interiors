

export const login = async (req, res) => {
  try {
    const { password } = req.body;

    const ADMIN_PASSWORD = "admin123"; 

    

    if (password === ADMIN_PASSWORD) {
      return res.json({ message: "Access granted" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
